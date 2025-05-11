
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifeBuoy } from 'lucide-react';
import { DynamicFooter } from '@/components/common/dynamic-footer';

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
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
        </div>
      </main>
      <DynamicFooter />
    </div>
  );
}
