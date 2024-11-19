"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Upload } from "lucide-react";

const challengeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum(["Fitness", "Nutrition", "Mindfulness", "Lifestyle"]),
  duration: z.string().min(1, "Duration is required"),
  winners: z.number().min(1, "Must have at least 1 winner").max(100),
});

type ChallengeForm = z.infer<typeof challengeSchema>;

export default function SubmitChallengePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeForm>({
    resolver: zodResolver(challengeSchema),
  });

  const onSubmit = async (data: ChallengeForm) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-title font-bold text-primary mb-8">
        Submit a New Challenge
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Challenge Title
          </label>
          <input
            {...register("title")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Enter challenge title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Describe your challenge"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="Fitness">Fitness</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Mindfulness">Mindfulness</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Duration (days)
            </label>
            <input
              {...register("duration")}
              type="number"
              min="1"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Number of Winners
          </label>
          <input
            {...register("winners", { valueAsNumber: true })}
            type="number"
            min="1"
            max="100"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          {errors.winners && (
            <p className="text-red-500 text-sm">{errors.winners.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Submit Challenge
        </button>
      </form>
    </div>
  );
}