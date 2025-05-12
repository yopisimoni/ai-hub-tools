
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifeBuoy } from 'lucide-react';

export default function SupportPage() {
  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <LifeBuoy className="h-10 w-10 text-primary" />
            <CardTitle className="text-2xl">Support Center</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Find help and support resources here. FAQs, contact information, and troubleshooting guides.
          </p>
          {/* Add support content, FAQs, contact form, etc. */}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
