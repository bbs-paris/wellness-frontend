"use client";

import { useState, useEffect } from 'react';
import { getContract } from '@/lib/contracts';
import { Challenge } from '@/types';
import { ethers } from 'ethers';

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const contract = getContract();
        if (!contract) throw new Error("Contract not initialized");

        // Note: Dans une vraie application, vous devriez implémenter une méthode
        // pour récupérer tous les défis ou utiliser des événements
        const challengeEvents = await contract.queryFilter(
          contract.filters.ChallengeCreated()
        );

        const challengesData = await Promise.all(
          challengeEvents.map(async (event) => {
            const challenge = await contract.challenges(event.args?.id);
            return {
              id: challenge.id.toString(),
              title: challenge.title,
              description: challenge.description,
              category: challenge.category,
              duration: challenge.duration.toNumber(),
              maxWinners: challenge.maxWinners.toNumber(),
              status: challenge.isActive ? 'active' : 'completed',
              partnerId: challenge.partner,
              reward: challenge.reward,
              createdAt: new Date(challenge.createdAt.toNumber() * 1000),
              updatedAt: new Date(challenge.createdAt.toNumber() * 1000),
            };
          })
        );

        setChallenges(challengesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch challenges");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return { challenges, loading, error };
}