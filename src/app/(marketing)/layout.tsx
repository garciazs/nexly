import { PremiumBackground } from "@/components/marketing/premium/premium-background";
import { FloatingAIButton } from "@/components/marketing/floating-ai-button";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PremiumBackground />
      {children}
      <FloatingAIButton />
    </div>
  );
}
