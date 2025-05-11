
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { DynamicFooter } from '@/components/common/dynamic-footer';

export default function CommentsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <MessageSquare className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl">My Comments</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A list of all comments you've made on various AI tools will be displayed here.
              </p>
              {/* Add logic to display user comments */}
            </CardContent>
          </Card>
        </div>
      </main>
      <DynamicFooter />
    </div>
  );
}
