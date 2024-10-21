// Libraries
import React from 'react';

// Components
import { Flex, Avatar, AvatarProps } from '@/components/ui';

// Utils
import { getMediaUrl } from '@/utils';

// Schemas
import { Organization } from '@/schemas';

interface OrganizationLogoProps {
  organization?: Organization;
  avatarProps?: AvatarProps;
}

export const OrganizationLogo: React.FC<OrganizationLogoProps> = props => {
  const { organization, avatarProps } = props;
  const { size = 75, ...restOfAvatarProps } = avatarProps || {};
  const { logo } = organization?.attributes || {};

  if (!logo) {
    return null;
  }

  return (
    <Flex justify="center">
      <Avatar
        src={getMediaUrl(logo?.data.attributes?.url || '')}
        size={size}
        {...restOfAvatarProps}
      />
    </Flex>
  );
};
