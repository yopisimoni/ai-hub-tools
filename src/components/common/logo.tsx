import { BrainCog } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

export const Logo: FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-1 -m-1">
      <BrainCog className="h-8 w-8 text-primary transition-transform group-hover:rotate-12 group-focus-visible:rotate-12" />
      <span className="text-2xl font-bold text-foreground group-hover:text-primary group-focus-visible:text-primary transition-colors">
        AI Tools Hub
      </span>
    </Link>
  );
};
