// Libraries
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import React from 'react';

// Icons
import { ChevronDownIcon } from 'lucide-react';

export interface SelectProps extends AntdSelectProps {}

export const Select: React.FC<SelectProps> = props => {
  return <AntdSelect {...props} suffixIcon={<ChevronDownIcon size={18} />} />;
};
