
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <DashboardLayout>
      <Card className="max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Mail className="h-10 w-10 text-primary" />
            <div>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
                <CardDescription>Get in touch with the AI Tools Hub team.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
            <div>
                 <h3 className="text-lg font-semibold mb-2 text-foreground">Send us a message</h3>
                 <p className="text-muted-foreground mb-4">Fill out the form below and we'll get back to you as soon as possible.</p>
                 {/* Basic Contact Form Placeholder */}
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Your Name" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Your message..." rows={5} />
                    </div>
                    <Button type="submit">Send Message</Button>
                </form>
            </div>

            <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-2 text-foreground">Other ways to reach us</h3>
                <div className="flex items-center gap-4 mb-2 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <span>support@aitoolshub.com</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                    <span>+1 (555) 123-4567 (Mon-Fri, 9am-5pm EST)</span>
                </div>
            </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
