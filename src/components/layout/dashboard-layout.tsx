
import type { FC, ReactNode } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DynamicFooter } from '@/components/common/dynamic-footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
           <div className="container mx-auto">
             {children}
          </div>
        </main>
      </div>
      <DynamicFooter />
    </div>
  );
};
