import type { FC, ReactNode } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  imageUrl?: string;
  imageHint?: string;
  actionLink?: string;
}

export const ToolCard: FC<ToolCardProps> = ({ title, description, icon, imageUrl, imageHint, actionLink = "#" }) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden shadow-lg transition-all hover:shadow-xl rounded-lg">
      {imageUrl && (
        <div className="relative h-40 w-full">
          <Image 
            src={imageUrl} 
            alt={title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={imageHint || "tool illustration"}
          />
        </div>
      )}
      <CardHeader className="flex flex-row items-start gap-4 pt-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground shrink-0">
          {icon}
        </span>
        <div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {!imageUrl && <CardDescription className="mt-1 text-sm">{description.substring(0, 70) + "..."}</CardDescription>}
        </div>
      </CardHeader>
      {imageUrl && <CardContent className="flex-grow pt-0">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>}
      <CardFooter className="mt-auto pt-0 pb-6">
        <Button asChild variant="default" className="w-full">
          <a href={actionLink}>
            Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
