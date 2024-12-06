"use client";

import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { useWallet } from "@/hooks/use-wallet";

export function ConnectButton() {
  const { address, isConnected, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-wellness-forest">
          {shortenAddress(address)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="text-wellness-forest hover:text-wellness-sage"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      className="bg-wellness-sage hover:bg-wellness-forest"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connecter le wallet
    </Button>
  );
}