
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingPageFooter } from "@/components/common/landing-page-footer";

export default function HomePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-muted to-background p-8 text-center relative pb-32 md:pb-24">
        <div className="mb-12">
          <Logo />
        </div>
        
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Welcome to the AI Tools Hub Portal
        </h1>
        
        <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Unlock the power of artificial intelligence. Sign in to access our suite of tools or create an account to get started.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/sign-in">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/sign-up">
              Create Account
            </Link>
          </Button>
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
}
