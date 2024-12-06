"use client";

import { useAccount } from 'wagmi';
import { useEffect, useState } from "react";

export function useAuth() {
  const { address, isConnected } = useAccount();
  const [isPartner, setIsPartner] = useState(false);

  useEffect(() => {
    const checkPartnerStatus = async () => {
      if (address) {
        // Dans une vraie application, vérifiez le rôle via un smart contract
        setIsPartner(address.toLowerCase().startsWith("0x1"));
      } else {
        setIsPartner(false);
      }
    };

    checkPartnerStatus();
  }, [address]);

  return {
    address,
    isConnected,
    isPartner,
  };
}