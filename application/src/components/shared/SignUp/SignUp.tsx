'use client';

// Libraries
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

// Components
import { Card, Flex, Typography, Form, Input, Button, Divider } from '@/components/ui';
import { createFormValidation } from '@/utils';

interface SignUpProps {}

type TFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

const { Text, Link } = Typography;
const { Item } = Form;

export const SignUp: React.FC<SignUpProps> = props => {
  const t = useTranslations();
  const { ...restProps } = props;

  const [form] = Form.useForm<TFormValues>();
  const formValidation = createFormValidation(t);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...restProps}>
      <Card className="w-[400px]" classNames={{ body: '!px-10 !py-8' }}>
        <Flex vertical gap={16}>
          <Flex vertical align="center">
            <Text strong className="!text-base">
              {t('signUp.createYourAccount')}
            </Text>
            <Text>{t('signUp.welcome')}</Text>
          </Flex>

          <Form name="signUp" layout="vertical" form={form}>
            <Item<TFormValues>
              name="username"
              label={t('signUp.username')}
              validateDebounce={500}
              rules={[{ required: true }]}
            >
              <Input />
            </Item>

            <Item<TFormValues>
              name="password"
              label={t('signUp.password')}
              hasFeedback
              rules={[{ required: true }, formValidation.passwordStrength()]}
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
              <Button htmlType="submit" type="primary" block>
                {t('signUp.title')}
              </Button>
            </Item>
          </Form>

          <Divider />

          <Flex align="center" justify="center" gap={4}>
            <Text>{t('signUp.alreadyHaveAccount')}</Text>
            <Link>{t('signUp.title')}</Link>
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
};
