"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChallengeList } from "@/components/partners/challenge-list";
import { SubmissionList } from "@/components/partners/submission-list";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PartnerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-wellness-forest">Tableau de Bord Partenaire</h1>
        <Button asChild className="bg-wellness-sage hover:bg-wellness-forest">
          <Link href="/partenaires/defis/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Défi
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold text-wellness-forest mb-2">Défis Actifs</h3>
          <p className="text-3xl font-bold text-wellness-sage">3</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-wellness-forest mb-2">Participations</h3>
          <p className="text-3xl font-bold text-wellness-sage">127</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-wellness-forest mb-2">En Attente de Validation</h3>
          <p className="text-3xl font-bold text-wellness-mauve">12</p>
        </Card>
      </div>

      <Tabs defaultValue="challenges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="challenges">Mes Défis</TabsTrigger>
          <TabsTrigger value="submissions">Soumissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges">
          <ChallengeList />
        </TabsContent>
        
        <TabsContent value="submissions">
          <SubmissionList />
        </TabsContent>
      </Tabs>
    </div>
  );
}