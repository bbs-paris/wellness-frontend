import { ArrowRight, Award, Users, Target } from 'lucide-react';
import Link from 'next/link';
import FeaturedChallenges from '@/components/FeaturedChallenges';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-title font-bold text-primary">
          Transform Your Wellness Journey
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Join our community of wellness enthusiasts and participate in exciting challenges
          created by trusted partners.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/challenges"
            className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            Explore Challenges <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/partner/register"
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Become a Partner
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center space-y-4">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-xl font-title font-bold text-primary">
            Choose Your Challenge
          </h3>
          <p className="text-gray-600">
            Browse through various wellness challenges and pick the ones that align with your goals.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-xl font-title font-bold text-primary">
            Join the Community
          </h3>
          <p className="text-gray-600">
            Connect with like-minded individuals and share your wellness journey.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-xl font-title font-bold text-primary">
            Win Rewards
          </h3>
          <p className="text-gray-600">
            Complete challenges successfully and earn recognition from our partners.
          </p>
        </div>
      </section>

      <FeaturedChallenges />
    </div>
  );
}