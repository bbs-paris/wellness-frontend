import { Calendar, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'react-bootstrap-icons';

const featuredChallenges = [
  {
    id: 1,
    title: '30-Day Meditation Challenge',
    description: 'Build a daily meditation practice with guided sessions.',
    category: 'Mindfulness',
    partner: 'MindfulLife Co.',
    duration: '30 days',
    winners: 3,
  },
  {
    id: 2,
    title: 'Healthy Cooking Challenge',
    description: 'Create nutritious meals using whole ingredients.',
    category: 'Nutrition',
    partner: 'HealthyEats',
    duration: '14 days',
    winners: 5,
  },
  {
    id: 3,
    title: 'Morning Yoga Series',
    description: 'Start your day with energizing yoga practices.',
    category: 'Fitness',
    partner: 'YogaWell',
    duration: '21 days',
    winners: 3,
  },
];

export default function FeaturedChallenges() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-title font-bold text-primary mb-8">
        Featured Challenges
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featuredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-semibold text-secondary">
                  {challenge.category}
                </span>
                <h3 className="text-xl font-title font-bold text-primary">
                  {challenge.title}
                </h3>
                <p className="text-gray-600">{challenge.description}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{challenge.partner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{challenge.winners} Winners</span>
                </div>
              </div>

              <Link
                href={`/challenges/${challenge.id}`}
                className="block bg-secondary text-white text-center py-2 rounded-lg hover:bg-secondary/90 transition"
              >
                Join Challenge
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/challenges"
          className="text-secondary hover:text-secondary/90 font-semibold inline-flex items-center gap-2"
        >
          View All Challenges <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}