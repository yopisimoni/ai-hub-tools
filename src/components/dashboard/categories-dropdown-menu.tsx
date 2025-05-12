
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { FC } from 'react';
import { toolCategories } from '@/lib/tool-data'; // Import toolCategories

export const CategoriesDropdownMenu: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shrink-0">
          <LayoutGrid className="mr-2 h-4 w-4" />
          Categories
          <ChevronDown className="ml-1 h-4 w-4 opacity-75" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>Browse AI Tool Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {toolCategories.map((category) => (
          <DropdownMenuItem key={category.slug} asChild>
            <Link href={`/categories/${category.slug}`} className="w-full">
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
