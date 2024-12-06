"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createChallenge } from "@/lib/contracts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const challengeSchema = z.object({
    title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
    description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
    category: z.string().min(1, "Veuillez sélectionner une catégorie"),
    duration: z.coerce.number().min(1, "La durée minimum est de 1 jour").max(90, "La durée maximum est de 90 jours"),
    maxWinners: z.coerce.number().min(1, "Il doit y avoir au moins 1 gagnant"),
    reward: z.string().min(5, "La récompense doit être décrite"),
});

const categories = [
    "Méditation",
    "Yoga",
    "Nutrition",
    "Sport",
    "Sommeil",
    "Bien-être mental",
    "Pleine conscience",
    "Relaxation"
];

export function ChallengeForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof challengeSchema>>({
        resolver: zodResolver(challengeSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            duration: 30,
            maxWinners: 1,
            reward: "",
        },
    });

    async function onSubmit(values: z.infer<typeof challengeSchema>) {
        try {
            setIsSubmitting(true);
            const tx = await createChallenge(
                values.title,
                values.description,
                values.category,
                values.duration,
                values.maxWinners,
                values.reward
            );

            toast({
                title: "Défi créé avec succès",
                description: "Votre défi a été publié sur la blockchain",
            });

            router.push("/partenaires/dashboard");
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la création du défi",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre du défi</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: 30 jours de méditation" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Décrivez le défi et ses objectifs..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez une catégorie" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Durée (en jours)</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} max={90} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxWinners"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de gagnants maximum</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="reward"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Récompense</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Un mois d'abonnement premium à notre application"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="bg-wellness-sage hover:bg-wellness-forest"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Création en cours..." : "Créer le défi"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}