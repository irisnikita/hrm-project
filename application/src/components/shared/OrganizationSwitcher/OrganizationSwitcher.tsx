'use client';

// Libraries
import React, { useMemo } from 'react';

// Hooks
import { useOrganization } from '@/hooks';

// Components
import { Avatar, Flex, Select, Typography } from '@/components/ui';

// Utils
import { getAvatarLabel, getMediaUrl } from '@/utils';

const { Text } = Typography;

export interface OrganizationSwitcherProps {}

export const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = () => {
  const { currentOrganization, organizationList, onChangeOrganization } = useOrganization();

  // Memos
  const options = useMemo(() => {
    return (
      organizationList?.map(organization => ({
        label: organization.attributes.organizationName,
        value: organization.id,
        logo: organization.attributes.logo,
        data: organization.attributes,
      })) || []
    );
  }, [organizationList]);

  // Renders
  const labelRender = ({ value, label }: any) => {
    const logo = organizationList?.find(organization => organization.id === value)?.attributes.logo;

    return (
      <Flex key={value} align="center" justify="between" className="w-full" gap={10}>
        <Avatar
          size="small"
          shape="circle"
          src={getMediaUrl(logo?.data?.attributes?.url || '')}
          className="shrink-0"
        >
          {getAvatarLabel(`${label}`)}
        </Avatar>
        <Text ellipsis>{label}</Text>
      </Flex>
    );
  };

  return (
    <Select
      className="w-[150px]"
      variant="borderless"
      options={options}
      value={currentOrganization?.id}
      getPopupContainer={() => document.body}
      popupMatchSelectWidth={200}
      labelRender={labelRender}
      optionRender={labelRender}
      onChange={onChangeOrganization}
    />
  );
};
