"use client";

import { useState, useEffect } from 'react';
import { getChallengeSubmissions } from '@/lib/contracts';
import { Submission } from '@/types';

export function useSubmissions(challengeId: string) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissionsData = await getChallengeSubmissions(Number(challengeId));
        
        const formattedSubmissions: Submission[] = submissionsData.map((sub: any) => ({
          id: sub.id.toString(),
          challengeId: sub.challengeId.toString(),
          userId: sub.participant,
          mediaUrl: sub.mediaUrl,
          mediaType: sub.mediaUrl.toLowerCase().endsWith('.mp4') ? 'video' : 'photo',
          comment: sub.comment,
          status: sub.isApproved ? 'approved' : 'pending',
          createdAt: new Date(sub.submittedAt.toNumber() * 1000),
          updatedAt: new Date(sub.submittedAt.toNumber() * 1000),
        }));

        setSubmissions(formattedSubmissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch submissions");
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchSubmissions();
    }
  }, [challengeId]);

  return { submissions, loading, error };
}