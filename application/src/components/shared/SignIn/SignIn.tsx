'use client';

// Libraries
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useImmer } from 'use-immer';

// Components
import { OrganizationLogo } from '@/components/shared/OrganizationLogo';
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Spin,
  Typography,
  message,
} from '@/components/ui';

// Constants
import { APP_CONFIG, ROUTE_KEYS, ROUTES } from '@/constants';

// Types
import { SignUpProps, TFormValues } from './types';

// Services
import { useAuthPage, useRouter, useUserConfig } from '@/hooks';

const { Text, Link } = Typography;
const { Item } = Form;

export const SignIn: React.FC<SignUpProps> = props => {
  // Hooks
  const { config, isLoading: isLoadingAuthPage } = useAuthPage();
  const t = useTranslations();
  const { setUserConfig } = useUserConfig();
  const [messageApi, contextHolder] = message.useMessage();
  const { pushKeepSearchQuery, push } = useRouter();
  const [form] = Form.useForm<TFormValues>();

  // Variables
  const { organization } = config;

  // State
  const [state, setState] = useImmer({
    isSignInLoading: false,
  });
  const { isSignInLoading } = state;

  // Mutation
  // const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();

  // Handlers
  const onFinish = useCallback(
    async (values: TFormValues) => {
      setState(draft => {
        draft.isSignInLoading = true;
      });

      const data = await signIn('credentials', {
        redirect: false,
        redirectTo: '/',
        ...values,
      });

      if (data?.error) {
        messageApi.error(t('signIn.signInError'));
      } else {
        setUserConfig(prev => ({
          ...prev,
          organizationId: organization?.id,
        }));
        push(ROUTES[ROUTE_KEYS.OVERVIEW].path || '');
      }

      setState(draft => {
        draft.isSignInLoading = false;
      });
    },
    [messageApi, organization?.id, push, setState, setUserConfig, t],
  );

  const redirectToSignUp = useCallback(() => {
    pushKeepSearchQuery(`${ROUTES[ROUTE_KEYS.SIGN_UP].path}`);
  }, [pushKeepSearchQuery]);

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
              {t('signIn.signInTo', {
                organizationName: organization?.attributes?.organizationName || APP_CONFIG.APP_NAME,
              })}
            </Text>
            <Text>{t('signIn.welcome')}</Text>
          </Flex>

          <Form name="signIn" layout="vertical" form={form} onFinish={onFinish}>
            <Item<TFormValues>
              name="identifier"
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
              <Button htmlType="submit" type="primary" block loading={isSignInLoading}>
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
