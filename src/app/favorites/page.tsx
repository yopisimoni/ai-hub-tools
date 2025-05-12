
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Star className="h-10 w-10 text-primary" />
            <CardTitle className="text-2xl">Favorite Apps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your favorite AI tools will be listed here for quick access.
          </p>
          {/* Add logic to display favorited tools */}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
