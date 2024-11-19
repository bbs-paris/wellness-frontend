"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Users, 
  Award, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data (replace with actual data fetching)
  const stats = {
    totalChallenges: 12,
    activeChallenges: 5,
    totalParticipants: 1250,
    pendingSubmissions: 45
  };

  const recentChallenges = [
    {
      id: 1,
      title: "30-Day Meditation Challenge",
      participants: 156,
      status: "active",
      submissions: 89,
      endDate: "2024-04-15"
    },
    // Add more challenges
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-title font-bold text-primary">
          Partner Dashboard
        </h1>
        <Link
          href="/partner/submit-challenge"
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
        >
          Create Challenge
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <Award className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Challenges</p>
              <p className="text-2xl font-bold text-primary">
                {stats.totalChallenges}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Challenges</p>
              <p className="text-2xl font-bold text-primary">
                {stats.activeChallenges}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-primary">
                {stats.totalParticipants}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <BarChart className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-primary">
                {stats.pendingSubmissions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="challenges" className="space-y-6">
        <TabsList>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-title font-bold text-primary mb-4">
                Recent Challenges
              </h2>
              <div className="space-y-4">
                {recentChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {challenge.participants} participants
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                        {challenge.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-title font-bold text-primary mb-4">
              Recent Submissions
            </h2>
            {/* Add submissions list component */}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-title font-bold text-primary mb-4">
              Challenge Analytics
            </h2>
            {/* Add analytics component */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}