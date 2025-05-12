
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center"> {/* Adjust height to account for header/footer */}
        <Card className="w-full max-w-md text-center shadow-xl rounded-lg">
          <CardHeader>
            <Frown className="mx-auto h-16 w-16 text-destructive" />
            <CardTitle className="mt-4 text-3xl font-bold">404 - Page Not Found</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              Oops! The page you're looking for doesn't seem to exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              It might have been moved, deleted, or maybe you just mistyped the URL.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">
                Go Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
