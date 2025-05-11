
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto">
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
        </div>
      </main>
       <footer className="py-6 text-center text-sm text-muted-foreground border-t bg-card">
         &copy; {new Date().getFullYear()} AI Tools Hub. All rights reserved.
      </footer>
    </div>
  );
}
