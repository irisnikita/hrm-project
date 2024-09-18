// Libraries
import React from "react";

// Providers
import { AntdConfigProvider } from "./AntdConfigProvider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  console.log("Providers");
  return <AntdConfigProvider>{children}</AntdConfigProvider>;
};
