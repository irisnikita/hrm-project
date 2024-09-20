"use client";

// Libraries
import React, { useRef, useState } from "react";
import { CircleUserIcon, Grid2X2Icon, HeartIcon } from "lucide-react";
import { theme } from "antd";
import { usePathname } from "next/navigation";

// Components
import { Layout, Menu, Flex } from "@/components/ui";
import { Header } from "@/components/shared";

const { Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = theme.useToken();
  const pathname = usePathname();
  const [collapsed /* setCollapsed */] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const showSidebar = pathname !== "/dashboard";

  return (
    <Layout id="dashboard-layout" className="h-screen">
      {showSidebar && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: token?.colorBgContainer }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <CircleUserIcon />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <Grid2X2Icon />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <HeartIcon />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
      )}
      <div ref={parentRef} className="neumorphism-section">
        <Header
          className="!sticky top-0"
          isDashboard
          parentRef={parentRef}
          leftContent={<Flex>1</Flex>}
        />
        <Content className="container flex flex-col px-4 pb-4">
          {children}
        </Content>
      </div>
    </Layout>
  );
}
