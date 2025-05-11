
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
          AI Tools Hub: Discover, Rank, and Share the Best in AI!
        </h1>
        
        <p className="mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl">
          Welcome to the world's premier destination for AI tools! We strive to keep everyone—developers, everyday users, kids, women, teams, and companies—updated with the latest and greatest in artificial intelligence. 
          This is your space to rank your favorite tools, get valuable feedback from real user experiences, exchange knowledge, and leave comments. 
          Join our community for free, create your personalized space, and let&apos;s explore the future of AI together!
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/sign-up">
              Join for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/sign-in">
              Let&apos;s Get Started
            </Link>
          </Button>
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
}
