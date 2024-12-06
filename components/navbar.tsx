import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { ConnectButton } from "@/components/wallet/connect-button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-wellness-peach/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-wellness-sage" />
            <span className="text-xl font-bold text-wellness-forest">Wellness</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/defis" className="text-wellness-forest hover:text-wellness-sage transition-colors">
              Défis
            </Link>
            <Link href="/recompenses" className="text-wellness-forest hover:text-wellness-sage transition-colors">
              Récompenses
            </Link>
            <Link href="/partenaires" className="text-wellness-forest hover:text-wellness-sage transition-colors">
              Partenaires
            </Link>
          </div>

          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}