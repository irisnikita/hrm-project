'use client';

// Libraries
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

// Components
import { OrganizationLogo } from '@/components/shared/OrganizationLogo';
import { Button, Card, Divider, Flex, Form, Input, Typography, message } from '@/components/ui';

// Constants
import { ROUTE_KEYS, ROUTES } from '@/constants';

// Types
import { SignUpProps, TFormValues } from './types';

// Queries
import { useSignIn } from '@/queries';

// Services
import { useRouter } from '@/hooks';

const { Text, Link } = Typography;
const { Item } = Form;

export const SignIn: React.FC<SignUpProps> = props => {
  const { organization, ...restProps } = props;

  const t = useTranslations();
  const [messageApi, contextHolder] = message.useMessage();
  const { pushKeepSearchQuery } = useRouter();
  const [form] = Form.useForm<TFormValues>();

  // Mutation
  const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();

  // Handlers
  const onFinish = useCallback(
    async (values: TFormValues) => {
      const data = await signIn(values);

      if (data.error) {
        messageApi.error(t('signIn.signInError'));
      }
    },
    [messageApi, signIn, t],
  );

  const redirectToSignUp = useCallback(() => {
    pushKeepSearchQuery(`${ROUTES[ROUTE_KEYS.SIGN_UP].path}`);
  }, [pushKeepSearchQuery]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...restProps}>
      {contextHolder}
      <Card className="w-[400px]" classNames={{ body: '!px-10 !py-8' }}>
        <Flex vertical gap={16}>
          <OrganizationLogo organization={organization} />

          <Flex vertical align="center">
            <Text strong className="!text-base">
              {t('signIn.signInTo', {
                organizationName: organization?.attributes?.organizationName,
              })}
            </Text>
            <Text>{t('signIn.welcome')}</Text>
          </Flex>

          <Form name="signIn" layout="vertical" form={form} onFinish={onFinish}>
            <Item<TFormValues>
              name="username"
              label={t('common.username')}
              validateDebounce={500}
              rules={[{ required: true }]}
            >
              <Input />
            </Item>

            <Item<TFormValues>
              name="password"
              label={t('common.password')}
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Item>

            <Item noStyle>
              <Button htmlType="submit" type="primary" block loading={isSigningIn}>
                {t('signIn.title')}
              </Button>
            </Item>
          </Form>

          <Divider />

          <Flex align="center" justify="center" gap={4}>
            <Text>{t('signIn.doNotHaveAccount')}</Text>
            <Link onClick={redirectToSignUp}>{t('signUp.title')}</Link>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
};
