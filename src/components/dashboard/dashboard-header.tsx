import { Logo } from '@/components/common/logo';
import { UserNav } from '@/components/dashboard/user-nav';
import type { FC } from 'react';
import { SearchInput } from './search-input';
import { CategoriesDropdownMenu } from './categories-dropdown-menu';

export const DashboardHeader: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="w-full max-w-xl">
            <SearchInput />
          </div>
          <CategoriesDropdownMenu />
        </div>
        <UserNav />
      </div>
    </header>
  );
};
