"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Shield, Building2 } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { getContract } from "@/lib/contracts";

const partnerSchema = z.object({
    companyName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
    description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
    website: z.string().url("Veuillez entrer une URL valide"),
});

export default function PartnerRegistrationPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { address, isConnected, connect } = useWallet();

    const form = useForm<z.infer<typeof partnerSchema>>({
        resolver: zodResolver(partnerSchema),
        defaultValues: {
            companyName: "",
            description: "",
            website: "",
        },
    });

    async function onSubmit(values: z.infer<typeof partnerSchema>) {
        if (!isConnected) {
            toast({
                title: "Connexion requise",
                description: "Veuillez connecter votre wallet pour continuer",
                variant: "destructive",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const contract = await getContract(true, WellnessHome_Address);
            if (!contract) throw new Error("Contract not initialized");

            // Enregistrement en tant que partenaire
            const tx = await contract.requestRegistrationAsPartner("nftnametest", "nftsymboltest");
            await tx.wait();

            toast({
                title: "Inscription réussie",
                description: "Votre compte partenaire a été créé avec succès",
            });

            router.push("/partenaires/dashboard");
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de l'inscription",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-wellness-forest mb-4">
                        Devenir Partenaire Wellness
                    </h1>
                    <p className="text-wellness-sage text-lg">
                        Rejoignez notre plateforme et proposez des défis bien-être inspirants
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-start gap-4">
                            <Shield className="w-8 h-8 text-wellness-sage" />
                            <div>
                                <h3 className="font-semibold text-wellness-forest mb-2">
                                    Pourquoi devenir partenaire ?
                                </h3>
                                <ul className="text-wellness-sage space-y-2">
                                    <li>• Touchez une communauté engagée</li>
                                    <li>• Proposez des défis personnalisés</li>
                                    <li>• Récompensez les participants</li>
                                    <li>• Développez votre visibilité</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-start gap-4">
                            <Building2 className="w-8 h-8 text-wellness-sage" />
                            <div>
                                <h3 className="font-semibold text-wellness-forest mb-2">
                                    Comment ça marche ?
                                </h3>
                                <ul className="text-wellness-sage space-y-2">
                                    <li>1. Remplissez le formulaire</li>
                                    <li>2. Connectez votre wallet</li>
                                    <li>3. Validez votre inscription</li>
                                    <li>4. Commencez à créer des défis</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-6">
                    {!isConnected ? (
                        <div className="text-center py-6">
                            <p className="text-wellness-forest mb-4">
                                Connectez votre wallet pour continuer
                            </p>
                            <Button
                                onClick={connect}
                                className="bg-wellness-sage hover:bg-wellness-forest"
                            >
                                Connecter le wallet
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nom de l'entreprise</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Votre entreprise" {...field} />
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
                                                    placeholder="Décrivez votre entreprise et votre vision du bien-être..."
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
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site web</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://www.votreentreprise.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="submit"
                                        className="bg-wellness-sage hover:bg-wellness-forest"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </Card>
            </div>
        </div>
    );
}