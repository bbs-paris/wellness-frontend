"use client";

import { Challenge } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Clock, Award } from "lucide-react";
import { SubmissionForm } from "@/components/challenges/submission-form";
import { useState } from "react";

// Données temporaires pour la démo
const MOCK_CHALLENGE: Challenge = {
  id: "1",
  title: "30 jours de méditation",
  description: "Méditez 10 minutes chaque jour pendant 30 jours pour développer une pratique régulière et améliorer votre bien-être mental. Ce défi vous aidera à créer une habitude durable de méditation quotidienne.",
  category: "Méditation",
  duration: 30,
  maxWinners: 50,
  status: "active",
  partnerId: "1",
  reward: "Un mois d'abonnement premium à une application de méditation",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ChallengePage({ params }: { params: { id: string } }) {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-wellness-forest mb-2">
                {MOCK_CHALLENGE.title}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-wellness-sage border-wellness-sage">
                  {MOCK_CHALLENGE.category}
                </Badge>
                <Badge 
                  variant={MOCK_CHALLENGE.status === 'active' ? 'default' : 'secondary'}
                  className="bg-wellness-sage"
                >
                  {MOCK_CHALLENGE.status === 'active' ? 'En cours' : 'Terminé'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-wellness-mauve" />
              <span className="text-wellness-mauve font-medium">
                {MOCK_CHALLENGE.reward}
              </span>
            </div>
          </div>

          <p className="text-wellness-sage mb-6 text-lg">
            {MOCK_CHALLENGE.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 text-wellness-forest">
              <Clock className="w-5 h-5" />
              <span>{MOCK_CHALLENGE.duration} jours</span>
            </div>
            <div className="flex items-center gap-2 text-wellness-forest">
              <Trophy className="w-5 h-5" />
              <span>{MOCK_CHALLENGE.maxWinners} gagnants max</span>
            </div>
            <div className="flex items-center gap-2 text-wellness-forest">
              <Calendar className="w-5 h-5" />
              <span>Début: {MOCK_CHALLENGE.createdAt.toLocaleDateString()}</span>
            </div>
          </div>

          {!showSubmissionForm ? (
            <Button 
              onClick={() => setShowSubmissionForm(true)}
              className="w-full bg-wellness-sage hover:bg-wellness-forest"
            >
              Participer au défi
            </Button>
          ) : (
            <SubmissionForm challengeId={params.id} onCancel={() => setShowSubmissionForm(false)} />
          )}
        </Card>
      </div>
    </div>
  );
}