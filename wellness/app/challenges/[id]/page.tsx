"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Trophy, User, Upload, Clock } from 'lucide-react';
import Image from 'next/image';

const submissionSchema = z.object({
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  mediaFile: z.any().refine((file) => file?.length > 0, "Media file is required")
});

type SubmissionForm = z.infer<typeof submissionSchema>;

export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SubmissionForm>({
    resolver: zodResolver(submissionSchema)
  });

  // Mock challenge data (replace with actual data fetching)
  const challenge = {
    id: params.id,
    title: "30-Day Meditation Challenge",
    description: "Build a daily meditation practice with guided sessions. Practice mindfulness and develop a consistent meditation routine.",
    category: "Mindfulness",
    partner: "MindfulLife Co.",
    duration: "30 days",
    winners: 3,
    endDate: "2024-04-15",
    participants: 156,
    status: "active"
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SubmissionForm) => {
    setIsSubmitting(true);
    try {
      // Handle submission logic here
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Challenge Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <span className="text-sm font-semibold text-secondary">
            {challenge.category}
          </span>
          <h1 className="text-3xl font-title font-bold text-primary">
            {challenge.title}
          </h1>
          <p className="text-gray-600">{challenge.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5 text-secondary" />
              <span>{challenge.partner}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-secondary" />
              <span>{challenge.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Trophy className="w-5 h-5 text-secondary" />
              <span>{challenge.winners} Winners</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-secondary" />
              <span>{challenge.participants} Participants</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-title font-bold text-primary mb-6">
          Submit Your Entry
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo/Video
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {preview ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-secondary hover:text-secondary/90">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      {...register("mediaFile")}
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {errors.mediaFile && (
              <p className="text-red-500 text-sm">{errors.mediaFile.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Comment
            </label>
            <textarea
              {...register("comment")}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Share your experience..."
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Submit Entry
              </>
            )}
          </button>
        </form>
      </div>

      {/* Previous Submissions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-title font-bold text-primary mb-6">
          Recent Submissions
        </h2>
        <div className="space-y-6">
          {/* Add submission list component here */}
          <p className="text-gray-600 text-center py-4">
            No submissions yet. Be the first to participate!
          </p>
        </div>
      </div>
    </div>
  );
}