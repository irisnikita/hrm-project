'use client';

// Libraries
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

// Hooks
import { useRouter } from '@/hooks';

// Components
import { Card, Flex, Typography, Form, Input, Button, Divider, message } from '@/components/ui';
import { OrganizationLogo } from '../OrganizationLogo';

// Constants
import { REGEX, ROUTE_KEYS, ROUTES, USER_ROLE_IDS, USER_ROLES } from '@/constants';

// Types
import { SignUpProps, TFormValues } from './types';

// Utils
import { handleFormatSignUpInfo } from './utils';
import { createFormValidation } from '@/utils';

// Queries
import { useCreateOrganizationRole, useCreateUser } from '@/queries';

// Services
import { userService } from '@/services';

const { Text, Link } = Typography;
const { Item } = Form;

export const SignUp: React.FC<SignUpProps> = props => {
  const t = useTranslations();
  const { organization, ...restProps } = props;
  // Routes
  const { pushKeepSearchQuery } = useRouter();

  const [form] = Form.useForm<TFormValues>();
  const formValidation = createFormValidation(t);
  const [messageApi, contextHolder] = message.useMessage();

  // Mutation
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
  const { mutateAsync: createOrganizationRole, isPending: isCreatingOrganizationRole } =
    useCreateOrganizationRole();

  // Handlers
  const redirectToSignIn = useCallback(() => {
    pushKeepSearchQuery(`${ROUTES[ROUTE_KEYS.SIGN_IN].path}`);
  }, [pushKeepSearchQuery]);

  const onFinish = useCallback(
    async (values: TFormValues) => {
      const signUpInfo = handleFormatSignUpInfo({
        values,
        organization,
        roleId: USER_ROLE_IDS.CUSTOMER,
      });

      const user = await createUser(signUpInfo);

      await createOrganizationRole({
        data: {
          organization: organization?.id || -1,
          role: USER_ROLES.CUSTOMER,
          user: user?.id || -1,
        },
      });

      messageApi[!user?.error ? 'success' : 'error'](
        !!user ? t('signUp.signUpSuccess') : t('signUp.signUpError'),
      );

      // Redirect to sign in
      if (!user?.error) {
        redirectToSignIn();
      }
    },
    [createOrganizationRole, createUser, messageApi, organization, redirectToSignIn, t],
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...restProps}>
      {contextHolder}
      <Card className="w-[400px]" classNames={{ body: '!px-10 !py-8' }}>
        <Flex vertical gap={16}>
          <OrganizationLogo organization={organization} />

          <Flex vertical align="center">
            <Text strong className="!text-base">
              {t('signUp.createYourAccount')}
            </Text>
            <Text>{t('signUp.welcome')}</Text>
          </Flex>

          <Form name="signUp" layout="vertical" form={form} onFinish={onFinish}>
            <Item<TFormValues>
              name="username"
              label={t('common.username')}
              validateDebounce={500}
              rules={[
                { required: true },
                {
                  async validator(_rule, value) {
                    if (value) {
                      // Check valid username
                      // If username is phone number
                      if (REGEX.NUMBER.test(value)) {
                        if (!REGEX.PHONE.test(value)) {
                          return Promise.reject(new Error(t('formValidation.phoneNumber')));
                        }
                      } else {
                        // If username is email
                        if (!REGEX.EMAIL.test(value)) {
                          return Promise.reject(new Error(t('formValidation.email')));
                        }
                      }

                      const { data } = await userService.checkUserName(value);
                      const { available } = data || {};

                      if (!available) {
                        return Promise.reject(
                          new Error(
                            t('formValidation.nameExists', {
                              fieldName: t('common.username'),
                            }),
                          ),
                        );
                      }

                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input />
            </Item>

            <Item<TFormValues>
              name="password"
              label={t('common.password')}
              hasFeedback
              rules={[{ required: true }, formValidation.basePasswordStrength()]}
            >
              <Input.Password />
            </Item>

            <Item<TFormValues>
              name="confirmPassword"
              label={t('signUp.confirmPassword')}
              rules={[{ required: true }, formValidation.confirmPassword]}
            >
              <Input.Password />
            </Item>

            <Item noStyle>
              <Button
                htmlType="submit"
                type="primary"
                block
                loading={isCreating || isCreatingOrganizationRole}
              >
                {t('signUp.title')}
              </Button>
            </Item>
          </Form>

          <Divider />

          <Flex align="center" justify="center" gap={4}>
            <Text>{t('signUp.alreadyHaveAccount')}</Text>
            <Link onClick={redirectToSignIn}>{t('signIn.title')}</Link>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
};
