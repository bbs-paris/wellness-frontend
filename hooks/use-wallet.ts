"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  async function checkConnection() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  }

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      setIsConnected(true);
    } else {
      setAddress(null);
      setIsConnected(false);
    }
  }

  async function connect() {
    if (!window.ethereum) {
      alert('Veuillez installer MetaMask pour utiliser cette application.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting:', error);
    }
  }

  async function disconnect() {
    setAddress(null);
    setIsConnected(false);
  }

  return {
    address,
    isConnected,
    connect,
    disconnect
  };
}