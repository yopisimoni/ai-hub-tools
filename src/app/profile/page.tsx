
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <UserCircle className="h-10 w-10 text-primary" />
            <CardTitle className="text-2xl">User Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is your profile page. User-specific information and settings will be displayed here.
          </p>
          {/* Add more profile details and editing options here */}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
