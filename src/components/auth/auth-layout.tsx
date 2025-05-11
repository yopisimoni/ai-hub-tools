import type { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/common/logo';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
