import { ChallengeList } from "@/components/challenges/challenge-list";
import { ChallengeFilters } from "@/components/challenges/challenge-filters";

export default function DefisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-wellness-forest">Défis Bien-être</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <ChallengeFilters />
        </aside>
        
        <main className="lg:col-span-3">
          <ChallengeList />
        </main>
      </div>
    </div>
  );
}