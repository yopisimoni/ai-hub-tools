// src/app/dashboard/page.tsx
"use client";

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import Link from 'next/link'; // Import Link
import { Rocket } from 'lucide-react';
import { toolCategories } from '@/lib/tool-data'; // Import centralized data
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const categories = toolCategories || [];
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      user.getToken({
        template: "__clerk_dev_firebase", 
      }).then((token) => {
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setIsAdmin(payload.admin === true);
        }
      }).catch((error) => {
        console.error("Error getting Firebase token:", error);
      });
    }
  }, [user]);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {isAdmin && (
          <div className="flex flex-col items-center p-6 border border-secondary rounded-lg shadow-sm space-y-4 text-center bg-secondary/10">
            <Rocket className="h-5 w-5 mr-3 text-primary" />
            <h2 className="text-xl font-semibold text-primary">Admin Tools</h2>
            <p className="text-foreground">Manage tool suggestions and more.</p>
            <Link href="/dashboard/admin/tool-suggestions" className="text-accent hover:underline">Go to Admin Tools</Link>
          </div>
        )}
        {categories.map((category) => (
          <div key={category.slug} className="flex flex-col items-center p-6 border border-secondary rounded-lg shadow-sm space-y-4 text-center bg-secondary/10">
            {category.icon}
            <Link href={`/categories/${category.slug}`} className="text-xl font-semibold text-primary hover:underline">
              <h2 >{category.name}</h2>
            </Link>
            <p className="text-foreground">{category.description}</p>
            <Link href={`/categories/${category.slug}`} className="text-accent hover:underline">Explore</Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
