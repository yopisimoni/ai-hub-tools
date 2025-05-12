
import type {Metadata} from 'next';
import { GeistSans as Geist } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/common/theme-provider'; // Import ThemeProvider

const geistSans = Geist; // Keep as object
const geistMono = GeistMono; // Keep as object

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
    <html lang="en" suppressHydrationWarning> {/* Add suppressHydrationWarning */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
