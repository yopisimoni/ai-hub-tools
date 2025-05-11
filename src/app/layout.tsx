
import type {Metadata} from 'next';
import { GeistSans as Geist } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist; // Correct: Geist (GeistSans) is an object
const geistMono = GeistMono; // Correct: GeistMono is an object

export const metadata: Metadata = {
  title: 'AI Tools Hub Portal',
  description: 'Access a suite of AI-powered tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

