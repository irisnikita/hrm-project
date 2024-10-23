'use client';

// Libraries
import React, { memo, useCallback } from 'react';
import { useTranslations } from 'next-intl';

// Components
import { Button, Card, Flex, Form, Input, Typography } from '@/components/ui';

// Types
import { User } from '@/schemas';

// Queries
import { useUpdateUser } from '@/queries';

// Hooks
import { useUser } from '@/hooks';

interface UserRequiredInfoFormProps {}

type TFormValues = Partial<User>;

const { Item } = Form;
const { Text } = Typography;

export const UserRequiredInfoForm: React.FC<UserRequiredInfoFormProps> = memo(props => {
  const { ...restProps } = props;

  const { user } = useUser();
  const t = useTranslations();
  const [form] = Form.useForm<TFormValues>();

  // Queries
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const onFinish = useCallback(
    async (values: TFormValues) => {
      await updateUser({
        id: user?.id,
        userData: {
          fullName: values.fullName,
        },
      });
    },
    [updateUser, user?.id],
  );

  return (
    <Card className="!m-auto w-[400px]" classNames={{ body: '!px-10 !py-8' }}>
      <Flex vertical gap={16} align="center">
        <Text strong className="!text-base">
          {t('userRequiredInfo.title')}
        </Text>

        <Form<TFormValues>
          name="userRequiredInfo"
          form={form}
          layout="vertical"
          className="w-full"
          onFinish={onFinish}
          {...restProps}
        >
          <Item<TFormValues>
            name="fullName"
            label={t('user.fullName')}
            rules={[{ required: true, max: 255 }]}
          >
            <Input />
          </Item>

          <Item noStyle>
            <Button htmlType="submit" type="primary" block loading={isUpdating}>
              {t('common.continue')}
            </Button>
          </Item>
        </Form>
      </Flex>
    </Card>
  );
});

UserRequiredInfoForm.displayName = 'UserRequiredInfoForm';
