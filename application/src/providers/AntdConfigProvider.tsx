// Libraries
import { ConfigProvider, type ConfigProviderProps } from "antd";
import React from "react";

// Constants
import { THEME } from "@/constants";

interface AntdConfigProviderProps extends ConfigProviderProps {}

export const AntdConfigProvider: React.FC<AntdConfigProviderProps> = (
  props
) => {
  return <ConfigProvider theme={THEME} {...props}></ConfigProvider>;
};
