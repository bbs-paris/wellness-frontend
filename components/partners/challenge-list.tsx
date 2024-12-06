import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Challenge } from "@/types";
import { Edit, Trash2 } from "lucide-react";

const MOCK_PARTNER_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "30 jours de méditation",
    description: "Méditez 10 minutes chaque jour pendant 30 jours.",
    category: "Méditation",
    duration: 30,
    maxWinners: 50,
    status: "active",
    partnerId: "1",
    reward: "Un mois d'abonnement premium",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function ChallengeList() {
  return (
    <div className="space-y-4">
      {MOCK_PARTNER_CHALLENGES.map((challenge) => (
        <Card key={challenge.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-wellness-forest">
                  {challenge.title}
                </h3>
                <Badge variant="outline" className="text-wellness-sage border-wellness-sage">
                  {challenge.category}
                </Badge>
              </div>
              <p className="text-wellness-sage mb-4">{challenge.description}</p>
              <div className="flex gap-4 text-sm text-wellness-forest">
                <span>Durée: {challenge.duration} jours</span>
                <span>Gagnants max: {challenge.maxWinners}</span>
                <span>Récompense: {challenge.reward}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}