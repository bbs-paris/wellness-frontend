"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Submission } from "@/types";
import { Check, X } from "lucide-react";
import { useSubmissions } from "@/hooks/use-submissions";
import { approveSubmission } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface SubmissionListProps {
  challengeId: string;
}

export function SubmissionList({ challengeId }: SubmissionListProps) {
  const { submissions, loading, error } = useSubmissions(challengeId);
  const { toast } = useToast();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = async (submissionId: string) => {
    try {
      setProcessingId(submissionId);
      await approveSubmission(Number(challengeId), Number(submissionId));
      
      toast({
        title: "Soumission approuvée",
        description: "La preuve a été validée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <div>Chargement des soumissions...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-wellness-forest">
                  Soumission #{submission.id}
                </h3>
                <Badge variant="outline" className={
                  submission.status === "pending" ? "text-wellness-sage border-wellness-sage" :
                  submission.status === "approved" ? "text-green-600 border-green-600" :
                  "text-red-600 border-red-600"
                }>
                  {submission.status === "pending" ? "En attente" :
                   submission.status === "approved" ? "Approuvé" : "Refusé"}
                </Badge>
              </div>
              <p className="text-wellness-sage mb-4">{submission.comment}</p>
              {submission.mediaUrl && (
                <div className="mb-4">
                  {submission.mediaType === "photo" ? (
                    <img 
                      src={submission.mediaUrl} 
                      alt="Preuve" 
                      className="max-h-40 rounded-lg"
                    />
                  ) : (
                    <video 
                      src={submission.mediaUrl} 
                      controls 
                      className="max-h-40 rounded-lg"
                    />
                  )}
                </div>
              )}
              <div className="text-sm text-wellness-forest">
                Soumis le: {submission.createdAt.toLocaleDateString()}
              </div>
            </div>
            {submission.status === "pending" && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-green-600 hover:text-green-700"
                  onClick={() => handleApprove(submission.id)}
                  disabled={!!processingId}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  disabled={!!processingId}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}