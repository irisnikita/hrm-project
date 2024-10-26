'use client';

// Libraries
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

// Hooks
import { useAuthPage, useRouter } from '@/hooks';

// Components
import {
  Card,
  Flex,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  message,
  Spin,
} from '@/components/ui';
import { OrganizationLogo } from '../OrganizationLogo';

// Constants
import { MAP_ROLE_ID, REGEX, ROUTE_KEYS, ROUTES } from '@/constants';

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

  // Routes
  const { pushKeepSearchQuery } = useRouter();

  // Hooks
  const { config, isLoading: isLoadingAuthPage } = useAuthPage();
  const [form] = Form.useForm<TFormValues>();
  const formValidation = createFormValidation(t);
  const [messageApi, contextHolder] = message.useMessage();

  // Mutation
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
  const { mutateAsync: createOrganizationRole, isPending: isCreatingOrganizationRole } =
    useCreateOrganizationRole();

  // Variables
  const { organization, role } = config;

  // Handlers
  const redirectToSignIn = useCallback(() => {
    pushKeepSearchQuery(`${ROUTES[ROUTE_KEYS.SIGN_IN].path}`);
  }, [pushKeepSearchQuery]);

  const onFinish = useCallback(
    async (values: TFormValues) => {
      const signUpInfo = handleFormatSignUpInfo({
        values,
        organization,
        roleId: MAP_ROLE_ID[role || 'employee'],
      });

      const user = await createUser(signUpInfo);

      if (organization) {
        await createOrganizationRole({
          data: {
            organization: organization?.id || -1,
            role: role || 'employee',
            user: user?.id || -1,
          },
        });
      }

      messageApi[!user?.error ? 'success' : 'error'](
        !user?.error ? t('signUp.signUpSuccess') : t('signUp.signUpError'),
      );

      // Redirect to sign in
      if (!user?.error) {
        redirectToSignIn();
      }
    },
    [createOrganizationRole, createUser, messageApi, organization, redirectToSignIn, role, t],
  );

  return isLoadingAuthPage ? (
    <Spin />
  ) : (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props}>
      {contextHolder}
      <Card className="w-[400px]" classNames={{ body: '!px-10 !py-8' }}>
        <Flex vertical gap={16}>
          <OrganizationLogo organization={organization} />

          <Flex vertical align="center" gap={8}>
            <Text strong className="!text-lg">
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
