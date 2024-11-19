"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

const categories = ["All", "Fitness", "Nutrition", "Mindfulness", "Lifestyle"];

const challenges = [
  {
    id: 1,
    title: "30-Day Meditation Challenge",
    description: "Build a daily meditation practice with guided sessions.",
    category: "Mindfulness",
    partner: "MindfulLife Co.",
    duration: "30 days",
    winners: 3,
  },
  // Add more challenges here
];

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesCategory =
      selectedCategory === "All" || challenge.category === selectedCategory;
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-title font-bold text-primary">
        Wellness Challenges
      </h1>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search challenges..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Challenge card content similar to FeaturedChallenges component */}
          </div>
        ))}
      </div>
    </div>
  );
}