import { Select as AntdSelect, SelectProps } from 'antd';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

export const Select: React.FC<SelectProps> = props => {
  return <AntdSelect {...props} suffixIcon={<ChevronDownIcon size={18} />} />;
};
