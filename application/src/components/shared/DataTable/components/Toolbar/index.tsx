// Libraries
import React from 'react';

// Components
import { Button, Flex } from '@/components/ui';

// Types
import { ToolbarProps } from '@/components/shared/DataTable/types';
import { useTranslations } from 'next-intl';

// Icons
import { PlusCircleIcon } from 'lucide-react';

export const Toolbar: React.FC<ToolbarProps> = ({ addButtonProps }) => {
  // Hooks
  const t = useTranslations();

  const {
    show: showAddButton = true,
    children = t('dataTable.addRecord'),
    icon = <PlusCircleIcon size={16} />,
    ...restOfAddButtonProps
  } = addButtonProps || {};

  return (
    <Flex data-test="data-table-toolbar" align="center" gap={8} className="px-4">
      {showAddButton && (
        <Button type="text" icon={icon} {...restOfAddButtonProps}>
          {children}
        </Button>
      )}
    </Flex>
  );
};
