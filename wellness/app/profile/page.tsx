"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Medal, 
  Calendar,
  Settings,
  Edit
} from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  // Mock user data (replace with actual data fetching)
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    completedChallenges: 8,
    activeChallenges: 2,
    achievements: [
      { id: 1, title: "Early Adopter", description: "Joined in the first month" },
      { id: 2, title: "Challenge Master", description: "Completed 5 challenges" }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-secondary" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-title font-bold text-primary">
              {user.name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              Member since {user.joinDate}
            </p>
          </div>
          <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user.completedChallenges}
            </div>
            <div className="text-sm text-gray-600">Completed Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user.activeChallenges}
            </div>
            <div className="text-sm text-gray-600">Active Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {user.achievements.length}
            </div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="challenges" className="space-y-6">
        <TabsList>
          <TabsTrigger value="challenges">My Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-title font-bold text-primary mb-4">
              Active Challenges
            </h2>
            {/* Add active challenges list */}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-title font-bold text-primary mb-4">
              Completed Challenges
            </h2>
            {/* Add completed challenges list */}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-title font-bold text-primary mb-6">
              Your Achievements
            </h2>
            <div className="grid gap-4">
              {user.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Medal className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-title font-bold text-primary mb-6">
              Account Settings
            </h2>
            {/* Add settings form */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}