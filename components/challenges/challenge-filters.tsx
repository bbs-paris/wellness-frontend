"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export function ChallengeFilters() {
  const categories = [
    "Méditation",
    "Yoga",
    "Nutrition",
    "Sport",
    "Sommeil",
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-wellness-forest mb-4">Filtres</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-wellness-forest mb-3">Catégories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox id={category} />
                <Label htmlFor={category} className="ml-2 text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-wellness-forest mb-3">Statut</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox id="active" />
              <Label htmlFor="active" className="ml-2 text-sm">
                En cours
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="completed" />
              <Label htmlFor="completed" className="ml-2 text-sm">
                Terminés
              </Label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}