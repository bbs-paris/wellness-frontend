"use client";

import { ChallengeForm } from "@/components/challenges/challenge-form";
import { Card } from "@/components/ui/card";

export default function NewChallengePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-wellness-forest mb-8">Créer un nouveau défi</h1>
        <Card className="p-6">
          <ChallengeForm />
        </Card>
      </div>
    </div>
  );
}