// Libraries
import dynamic from 'next/dynamic';
import React from 'react';

// Components
const DashboardLayout = dynamic(() => import('./components/DashboardLayout'), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
