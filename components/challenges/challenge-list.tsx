"use client";

import { ChallengeCard } from "./challenge-card";
import { Challenge } from "@/types";

// Données temporaires pour la démo
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "30 jours de méditation",
    description: "Méditez 10 minutes chaque jour pendant 30 jours pour développer une pratique régulière.",
    category: "Méditation",
    duration: 30,
    maxWinners: 50,
    status: "active",
    partnerId: "1",
    reward: "Un mois d'abonnement premium à une app de méditation",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Défi Yoga Matinal",
    description: "Pratiquez 15 minutes de yoga chaque matin pendant 2 semaines.",
    category: "Yoga",
    duration: 14,
    maxWinners: 25,
    status: "active",
    partnerId: "2",
    reward: "Un tapis de yoga écologique",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function ChallengeList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {MOCK_CHALLENGES.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}