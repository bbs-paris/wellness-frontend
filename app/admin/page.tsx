"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Key } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { registerPartner } from "@/lib/contracts";
import { shortenAddress } from "@/lib/utils";

interface PartnerRequest {
    address: string;
    companyName: string;
    website: string;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
}

// Données temporaires pour la démo
const MOCK_REQUESTS: PartnerRequest[] = [
    {
        address: "0x1234567890123456789012345678901234567890",
        companyName: "Wellness Corp",
        website: "https://wellness-corp.com",
        status: "pending",
        createdAt: new Date(),
    },
];

export default function AdminPage() {
    const { toast } = useToast();
    
    const [showKey, setShowKey] = useState(false);
    const [processingAddress, setProcessingAddress] = useState<string | null>(null);

    const handleApprove = async (address: string) => {
        if (!ownerKey) {
            toast({
                title: "Erreur",
                description: "Veuillez d'abord configurer la clé privée du propriétaire",
                variant: "destructive",
            });
            return;
        }

        try {
            setProcessingAddress(address);
            await approvePartnerRegistration(address);

            toast({
                title: "Partenaire approuvé",
                description: "Le partenaire a été approuvé avec succès",
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de l'approbation",
                variant: "destructive",
            });
        } finally {
            setProcessingAddress(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-wellness-forest mb-8">
                    Administration
                </h1>
                                
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-wellness-forest mb-4">
                        Demandes de partenariat
                    </h2>

                    <div className="space-y-4">
                        {MOCK_REQUESTS.map((request) => (
                            <Card key={request.address} className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-wellness-forest mb-1">
                                            {request.companyName}
                                        </h3>
                                        <p className="text-sm text-wellness-sage mb-2">
                                            {shortenAddress(request.address)}
                                        </p>
                                        <a
                                            href={request.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-wellness-sage hover:text-wellness-forest"
                                        >
                                            {request.website}
                                        </a>
                                    </div>

                                    {request.status === "pending" && (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-green-600 hover:text-green-700"
                                                onClick={() => handleApprove(request.address)}
                                                disabled={!!processingAddress}
                                            >
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700"
                                                disabled={!!processingAddress}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}