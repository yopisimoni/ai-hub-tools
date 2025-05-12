
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function CommentsPage() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
