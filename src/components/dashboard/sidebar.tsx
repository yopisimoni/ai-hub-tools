
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, UserCircle, Star, MessageSquare, Settings, LifeBuoy, Newspaper, Mail } from 'lucide-react'; // Added Newspaper, Mail
import type { FC } from 'react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/favorites', label: 'Favorites', icon: Star },
  { href: '/comments', label: 'Comments', icon: MessageSquare },
  { href: '/blog', label: 'Blog', icon: Newspaper }, // Added Blog link
  { type: 'separator' }, // Optional separator
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/contact', label: 'Contact Us', icon: Mail }, // Added Contact link
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r bg-card p-4 hidden md:block">
       <ScrollArea className="h-full">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            if (item.type === 'separator') {
              return <div key={`sep-${index}`} className="my-2 border-t border-border" />;
            }

            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'justify-start',
                  isActive && 'font-semibold'
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
       </ScrollArea>
    </aside>
  );
};
