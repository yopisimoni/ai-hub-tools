
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
  return (
    <DashboardLayout>
      <Card className="max-w-4xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Newspaper className="h-10 w-10 text-primary" />
            <div>
                <CardTitle className="text-2xl">Our Blog</CardTitle>
                <CardDescription>Latest news, articles, and insights from the AI Tools Hub team.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Welcome to our blog! Here you'll find updates about new AI tools, tips on how to use them effectively, industry trends, and more. Stay tuned for upcoming posts.
          </p>
          {/* Placeholder for blog posts */}
          <div className="space-y-6">
            {[1, 2, 3].map((post) => (
              <Card key={post} className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Blog Post Title {post}</CardTitle>
                  <CardDescription>Published on [Date] by [Author]</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    This is a placeholder for the blog post excerpt. It gives a brief overview of the content within. We will be adding real blog content here soon... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
