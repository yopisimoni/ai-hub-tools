
"use client";

import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { DynamicFooter } from '@/components/common/dynamic-footer';

const TermsOfUsePage: NextPage = () => {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto shadow-lg rounded-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <FileText className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl">Terms of Use</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground">
              <div>
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using the AI Tools Hub Portal ("Service"), you agree to be bound by these Terms of Use ("Terms"). If you disagree with any part of the terms, then you may not access the Service. Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">2. Use License</h2>
                <p className="text-muted-foreground mb-2">
                  Permission is granted to temporarily download one copy of the materials (information or software) on AI Tools Hub Portal's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4 text-muted-foreground">
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                  <li>attempt to decompile or reverse engineer any software contained on AI Tools Hub Portal's website;</li>
                  <li>remove any copyright or other proprietary notations from the materials; or</li>
                  <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  This license shall automatically terminate if you violate any of these restrictions and may be terminated by AI Tools Hub Portal at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">3. Disclaimer</h2>
                <p className="text-muted-foreground">
                  The materials on AI Tools Hub Portal's website are provided on an 'as is' basis. AI Tools Hub Portal makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, AI Tools Hub Portal does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">4. Limitations</h2>
                <p className="text-muted-foreground">
                  In no event shall AI Tools Hub Portal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI Tools Hub Portal's website, even if AI Tools Hub Portal or a AI Tools Hub Portal authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">5. Accuracy of Materials</h2>
                <p className="text-muted-foreground">
                  The materials appearing on AI Tools Hub Portal's website could include technical, typographical, or photographic errors. AI Tools Hub Portal does not warrant that any of the materials on its website are accurate, complete or current. AI Tools Hub Portal may make changes to the materials contained on its website at any time without notice. However AI Tools Hub Portal does not make any commitment to update the materials.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">6. Links</h2>
                <p className="text-muted-foreground">
                  AI Tools Hub Portal has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AI Tools Hub Portal of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">7. Modifications</h2>
                <p className="text-muted-foreground">
                  AI Tools Hub Portal may revise these Terms of Use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Use.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Last updated: {lastUpdatedDate || 'Loading...'}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <DynamicFooter />
    </div>
  );
};

export default TermsOfUsePage;
