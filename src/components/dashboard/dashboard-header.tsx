import { Logo } from '@/components/common/logo';
import { UserNav } from '@/components/dashboard/user-nav';
import type { FC } from 'react';

export const DashboardHeader: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <UserNav />
      </div>
    </header>
  );
};
