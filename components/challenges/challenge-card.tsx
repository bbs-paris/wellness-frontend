import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Clock } from "lucide-react";
import { Challenge } from "@/types";
import Link from "next/link";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-wellness-forest">{challenge.title}</h3>
          <Badge 
            variant={challenge.status === 'active' ? 'default' : 'secondary'}
            className="bg-wellness-sage"
          >
            {challenge.status === 'active' ? 'En cours' : 'Terminé'}
          </Badge>
        </div>
        
        <p className="text-wellness-sage mb-4 line-clamp-2">{challenge.description}</p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-wellness-forest">
            <Clock className="w-4 h-4 mr-2" />
            {challenge.duration} jours
          </div>
          <div className="flex items-center text-sm text-wellness-forest">
            <Trophy className="w-4 h-4 mr-2" />
            {challenge.maxWinners} gagnants max
          </div>
          <div className="flex items-center text-sm text-wellness-forest">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(challenge.createdAt).toLocaleDateString()}
          </div>
        </div>

        <Button asChild className="w-full bg-wellness-sage hover:bg-wellness-forest">
          <Link href={`/defis/${challenge.id}`}>
            Participer au défi
          </Link>
        </Button>
      </div>
    </Card>
  );
}