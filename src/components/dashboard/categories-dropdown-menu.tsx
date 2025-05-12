
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

const categories = [
  { name: "Text Generation", href: "/categories/text-generation" },
  { name: "Image Generation", href: "/categories/image-generation" },
  { name: "Code Assistance", href: "/categories/code-assistance" },
  { name: "Data Analysis", href: "/categories/data-analysis" },
  { name: "Audio & Video Tools", href: "/categories/audio-video" },
  { name: "Productivity Boosters", href: "/categories/productivity" },
  { name: "Research & Insights", href: "/categories/research" },
  { name: "Marketing & Sales", href: "/categories/marketing-sales" },
  { name: "Education & Learning", href: "/categories/education-learning" },
  { name: "Developer Tools", href: "/categories/developer-tools" },
];

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
        {categories.map((category) => (
          <DropdownMenuItem key={category.name} asChild>
            <Link href={category.href} className="w-full">
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
