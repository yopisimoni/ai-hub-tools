
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
       <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Settings className="h-10 w-10 text-primary" />
            <CardTitle className="text-2xl">Account Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage your account preferences and settings here.
          </p>
          {/* Add various settings options like theme, notifications, password change etc. */}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
