import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Award, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-wellness-forest mb-4">
          Bienvenue sur Wellness
        </h1>
        <p className="text-xl text-wellness-sage mb-8">
          Relevez des défis bien-être, gagnez des récompenses
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-wellness-sage hover:bg-wellness-forest">
            <Link href="/defis">Découvrir les défis</Link>
          </Button>
          <Button asChild variant="outline" className="border-wellness-sage text-wellness-sage hover:bg-wellness-sage hover:text-white">
            <Link href="/partenaires/inscription">Devenir partenaire</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Leaf className="w-12 h-12 mx-auto mb-4 text-wellness-sage" />
          <h3 className="text-xl font-semibold mb-2 text-wellness-forest">Défis Bien-être</h3>
          <p className="text-wellness-sage">Participez à des défis inspirants pour améliorer votre bien-être quotidien</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Award className="w-12 h-12 mx-auto mb-4 text-wellness-mauve" />
          <h3 className="text-xl font-semibold mb-2 text-wellness-forest">Récompenses</h3>
          <p className="text-wellness-sage">Gagnez des récompenses exclusives en relevant les défis avec succès</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Users className="w-12 h-12 mx-auto mb-4 text-wellness-sage" />
          <h3 className="text-xl font-semibold mb-2 text-wellness-forest">Communauté</h3>
          <p className="text-wellness-sage">Rejoignez une communauté engagée vers le bien-être et le développement personnel</p>
        </Card>
      </div>

      <div className="wellness-gradient rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
        <p className="mb-6 text-lg">Inscrivez-vous gratuitement et commencez à relever des défis dès aujourd'hui</p>
        <Button asChild className="bg-white text-wellness-forest hover:bg-wellness-peach">
          <Link href="/inscription">S'inscrire maintenant</Link>
        </Button>
      </div>
    </div>
  );
}