"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { ImagePlus, Upload } from "lucide-react";
import { submitProof } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";

const submissionSchema = z.object({
  comment: z.string().min(10, "Le commentaire doit contenir au moins 10 caractères"),
  mediaUrl: z.string().optional(),
});

interface SubmissionFormProps {
  challengeId: string;
  onCancel: () => void;
}

export function SubmissionForm({ challengeId, onCancel }: SubmissionFormProps) {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      comment: "",
      mediaUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof submissionSchema>) {
    try {
      setIsSubmitting(true);
      // Note: Dans une vraie application, vous devriez d'abord uploader le média sur IPFS
      const mediaUrl = mediaPreview || "";
      
      await submitProof(
        Number(challengeId),
        mediaUrl,
        values.comment
      );

      toast({
        title: "Preuve soumise avec succès",
        description: "Votre participation a été enregistrée sur la blockchain",
      });

      onCancel();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de la preuve",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // ... (rest of the component remains the same) ...

  return (
    <Card className="p-6 bg-wellness-peach/10">
      {/* ... (form structure remains the same) ... */}
      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          className="bg-wellness-sage hover:bg-wellness-forest"
          disabled={isSubmitting}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isSubmitting ? "Soumission en cours..." : "Soumettre"}
        </Button>
      </div>
    </Card>
  );
}