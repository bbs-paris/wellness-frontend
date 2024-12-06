import { ethers } from 'ethers';
import WellnessChallengeABI from '@/contracts/WellnessChallenge.json';

/* const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string; */
const WellnessHome_Address = process.env.Public_WellnessHome_Address as string;
const ChallengeManager_Address = process.env.Public_ChallengeManager_Address as string;
const PartnerChallengeCompletionValidationStrategy_Address = process.env.Public_PartnerChallengeCompletionValidationStrategy_Address as string;
const DefaultChallengeRewardStrategy_Address = process.env.Public_DefaultChallengeRewardStrategy_Address as string;

export async function getContract(withSigner = false, CONTRACT_ADDRESS) {
  if (typeof window === 'undefined' || !window.ethereum) return null;

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    if (withSigner) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, WellnessChallengeABI, signer);
    }
    
    return new ethers.Contract(CONTRACT_ADDRESS, WellnessChallengeABI, provider);
  } catch (error) {
    console.error('Error getting contract:', error);
    return null;
  }
}

export async function createChallenge(
  title: string,
  description: string,
  category: string,
  duration: number,
  maxWinners: number,
  reward: string
) {
    const contract = await getContract(true, ChallengeManager_Address);
  if (!contract) throw new Error("Contract not initialized");

  const tx = await contract.createChallenge(
    title,
    description,
    category,
    maxWinners,
    duration    
  );

  await tx.wait();
  return tx;
}

export async function submitProof(
  challengeId: number,
  mediaUrl: string,
  comment: string
) {
  const contract = await getContract(true);
  if (!contract) throw new Error("Contract not initialized");

  const tx = await contract.submitProof(challengeId, mediaUrl, comment);
  await tx.wait();
  return tx;
}

export async function approveSubmission(challengeId: number, submissionId: number) {
  const contract = await getContract(true);
  if (!contract) throw new Error("Contract not initialized");

  const tx = await contract.approveSubmission(challengeId, submissionId);
  await tx.wait();
  return tx;
}

export async function getChallengeSubmissions(challengeId: number) {
  const contract = await getContract();
  if (!contract) throw new Error("Contract not initialized");
  
  return await contract.getChallengeSubmissions(challengeId);
}

export async function approvePartnerRegistration(address: string) {
    const contract = await getContract(true, WellnessHome_Address);
    if (!contract) throw new Error("Contract not initialized");

    const tx = await contract.addPartner(address);
    await tx.wait();
    return tx;
}

export async function isPartner(address: string): Promise<boolean> {
    const contract = await getContract();
    if (!contract) throw new Error("Contract not initialized");

    return await contract.partners(address);
}