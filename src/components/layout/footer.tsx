import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-primary/20 bg-background/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {siteConfig.portfolioOwnerName}. All rights reserved.</p>
        <p className="text-sm mt-1">Powered by Next.js & Tailwind CSS. Designed with a futuristic vision.</p>
      </div>
    </footer>
  );
}
