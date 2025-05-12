
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { FC } from "react";

export const SearchInput: FC = () => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search AI tools..."
        className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 focus-visible:ring-primary"
        aria-label="Search AI tools"
      />
    </div>
  );
};
