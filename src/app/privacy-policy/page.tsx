
"use client";

import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '@/components/layout/dashboard-layout'; // Use DashboardLayout
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicyPage: NextPage = () => {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <DashboardLayout> {/* Wrap with DashboardLayout */}
        <Card className="max-w-4xl mx-auto shadow-lg rounded-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground">
            <p className="text-muted-foreground">
              Your privacy is important to us. It is AI Tools Hub Portal's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-2">
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
              </p>
              <p className="text-muted-foreground mb-2">
                <strong>Log data:</strong> When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
              </p>
              <p className="text-muted-foreground mb-2">
                <strong>Device data:</strong> We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data. What we collect can depend on the individual settings of your device and software. We recommend checking the policies of your device manufacturer or software provider to learn what information they make available to us.
              </p>
              <p className="text-muted-foreground">
                <strong>Personal information:</strong> We may ask for personal information, such as your: Name, Email, Social media profiles, Date of birth, Phone/mobile number, Home/Mailing address, Work address, Payment information (if applicable for services).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Legal Bases for Processing</h2>
              <p className="text-muted-foreground">
                We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so. These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:
              </p>
               <ul className="list-disc list-inside space-y-1 pl-4 text-muted-foreground mt-2">
                <li>it’s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
                <li>it satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
                <li>you give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter); or</li>
                <li>we need to process your data to comply with a legal obligation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Use of Information</h2>
              <p className="text-muted-foreground">
                We may use the information we collect for various purposes, including to: Provide, operate, and maintain our website; Improve, personalize, and expand our website; Understand and analyze how you use our website; Develop new products, services, features, and functionality; Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes (with your consent); Send you emails; Find and prevent fraud.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Security of Your Personal Information</h2>
              <p className="text-muted-foreground">
                We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification. However, remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to be informed about how your data is collected and used. You are entitled to know what data we collect about you, and how it is processed. You are entitled to correct and update any personal information about you, and to request this information be deleted. You may amend your account information at any time by logging into your account and accessing your profile settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at [Your Contact Email or Link to Contact Page].
              </p>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Last updated: {lastUpdatedDate || 'Loading...'}
            </p>
          </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default PrivacyPolicyPage;
