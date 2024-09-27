'use client';

// Libraries
import { memo } from 'react';
import { CirclePlus, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useImmer } from 'use-immer';

// Components
import {
  Flex,
  Typography,
  List,
  Avatar,
  Form,
  Input,
  Button,
  Upload,
  Scrollbars,
} from '@/components/ui';

// Styled
import { ListItem, StyledCard } from './styled';

// Queries
import { useCreateOrganization, useGetOrganizationList } from '@/queries/organization';
import { useUpdateUser } from '@/queries/user';

// Utils
import {
  formatLabelToSlug,
  getMediaUrl,
  getUploadValueFromEvent,
  handleUploadChange,
} from '@/utils';

// Schemas
import { CreateOrganization, Organization } from '@/schemas';

// Constants
import { GLOBAL_TOKEN, MAX_FILE_SIZE } from '@/constants';

// Services
import { organizationService, uploadServices } from '@/services';

// Hooks
import { useUser } from '@/hooks';
import { useUserConfig } from '@/hooks/useUserConfig';

type TState = {
  isAddNewOrganization: boolean;
};
type TFormValues = {
  logo: any[];
  organizationName: string;
  slug: string;
};

export interface OrganizationListProps {}

const { Text } = Typography;

export const OrganizationList = memo(() => {
  const t = useTranslations();
  const { systemUser } = useUser();
  console.log('🚀 ~ OrganizationList ~ systemUser:', systemUser);
  const [form] = Form.useForm<TFormValues>();
  const { setUserConfig } = useUserConfig();
  const [state, setState] = useImmer<TState>({
    isAddNewOrganization: false,
  });

  // Queries
  const { data, isLoading } = useGetOrganizationList({
    args: {
      params: {
        populate: 'logo,owner',
        'filters[users][$in]': systemUser?.id || 0,
      },
    },
  });
  const { mutateAsync: createOrganization, isPending: isCreatingOrganization } =
    useCreateOrganization();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  // Variables
  const isLoadingForm = isCreatingOrganization || isUpdatingUser;
  const { isAddNewOrganization } = state;

  // Handlers
  const onClickOrganization = (item: Organization) => {
    setUserConfig(prev => ({ ...prev, organizationId: item.id }));
  };

  const onClickCancel = () => {
    setState(draft => {
      draft.isAddNewOrganization = false;
    });

    form.resetFields();
  };

  const onChangeUploadLogo = handleUploadChange(form, 'logo', MAX_FILE_SIZE.IMAGE);

  const onFinish = async (values: TFormValues) => {
    // Upload logo
    const { logo, organizationName, slug } = values;
    const createOrganizationData: CreateOrganization['data'] = {
      logo: undefined,
      owner: systemUser?.id || 0,
      organizationName,
      slug,
    };

    if (logo && logo.length) {
      const uploadedFiles = await uploadServices.uploadFiles(
        logo.map((file: any) => file.originFileObj),
      );

      // If uploaded logo, create new organization
      if (uploadedFiles.length) {
        const uploadedFile = uploadedFiles[0];

        createOrganizationData.logo = uploadedFile.id;
      }
    }

    const response = await createOrganization({
      data: createOrganizationData,
    });

    await updateUser({
      id: systemUser?.id || 0,
      userData: {
        organizations: systemUser.organizations
          ?.map(organization => organization.id || 0)
          .concat(response.data?.id || 0),
      },
    });

    if (!!response.data) {
      form.resetFields();
      setState(draft => {
        draft.isAddNewOrganization = false;
      });
    }
  };

  // Renders
  const renderOrganizationList = () => (
    <>
      <Flex vertical align="center" justify="center" className="mb-4">
        <Text className="!text-lg" strong>
          {t('organizationList.title')}
        </Text>
        <Text>{t('organizationList.description')}</Text>
      </Flex>
      <Scrollbars
        autoHeight
        autoHeightMax={300}
        style={{ borderRadius: GLOBAL_TOKEN?.borderRadius }}
      >
        <List
          bordered
          itemLayout="horizontal"
          dataSource={data?.data || []}
          loading={isLoading}
          renderItem={item => {
            const { id, attributes } = item;
            const { organizationName, logo, owner } = attributes || {};
            const isOwner = owner?.data?.id === systemUser?.id;

            return (
              <ListItem key={id} onClick={() => onClickOrganization(item)}>
                <Flex align="center" gap={16}>
                  <Avatar shape="circle" src={getMediaUrl(logo?.data?.attributes?.url || '')} />
                  <Text strong={id !== -1}>{organizationName}</Text>
                </Flex>

                {isOwner && (
                  <Flex align="center" gap={16}>
                    <Trash2Icon className="remove-icon" size={16} />
                  </Flex>
                )}
              </ListItem>
            );
          }}
        />
      </Scrollbars>

      <Button
        block
        icon={<CirclePlus size={16} />}
        className="mt-4"
        onClick={() =>
          setState(draft => {
            draft.isAddNewOrganization = true;
          })
        }
      >
        {t('organizationList.createNewOrganization')}
      </Button>
    </>
  );

  const renderAddNewOrganization = () => (
    <Flex vertical gap={16}>
      <Text strong className="!text-lg">
        {t('organizationList.createNewOrganization')}
      </Text>

      <Form<TFormValues>
        form={form}
        layout="vertical"
        requiredMark={(label, info) => (
          <Flex align="center" gap={4}>
            {label}
            {info.required ? <Text type="danger">*</Text> : null}
          </Flex>
        )}
        onValuesChange={values => {
          if (values.organizationName) {
            form.setFieldsValue({
              slug: formatLabelToSlug(values.organizationName),
            });
          }
        }}
        onFinish={onFinish}
      >
        <Form.Item label={t('organizationList.logo')}>
          <Form.Item<TFormValues>
            noStyle
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={getUploadValueFromEvent}
          >
            <Upload maxCount={1} onChange={onChangeUploadLogo} />
          </Form.Item>
        </Form.Item>

        <Form.Item<TFormValues>
          name="organizationName"
          label={t('organizationList.organizationName')}
          validateDebounce={500}
          rules={[
            {
              required: true,
              max: 255,
              min: 2,
            },
            {
              async validator(_rule, value) {
                if (value) {
                  const { data } = await organizationService.getOrganizationList({
                    params: {
                      'filters[organizationName][$eqi]': value.trim(),
                    },
                  });

                  if (data?.length) {
                    return Promise.reject(
                      new Error(
                        t('formValidation.nameExists', {
                          fieldName: t('organizationList.organizationName'),
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
        </Form.Item>
        <Form.Item<TFormValues>
          name="slug"
          label={t('organizationList.slug')}
          rules={[
            {
              required: true,
              max: 255,
              min: 2,
            },
            {
              async validator(_rule, value) {
                if (value) {
                  const { data } = await organizationService.getOrganizationList({
                    params: {
                      'filters[slug][$eqi]': value.trim(),
                    },
                  });

                  if (data?.length) {
                    return Promise.reject(
                      new Error(
                        t('formValidation.nameExists', {
                          fieldName: t('organizationList.slug'),
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
        </Form.Item>

        <Form.Item noStyle>
          <Flex gap={16}>
            <Button onClick={onClickCancel} disabled={isLoadingForm}>
              {t('common.cancel')}
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoadingForm}>
              {t('common.create')}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );

  return (
    <StyledCard bordered={false} className="glass-background !m-auto">
      {isAddNewOrganization ? renderAddNewOrganization() : renderOrganizationList()}
    </StyledCard>
  );
});

OrganizationList.displayName = 'OrganizationList';
