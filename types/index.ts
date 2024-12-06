export type Challenge = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // en jours
  maxWinners: number;
  status: 'draft' | 'active' | 'completed';
  partnerId: string;
  reward: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Submission = {
  id: string;
  challengeId: string;
  userId: string;
  mediaUrl: string;
  mediaType: 'photo' | 'video';
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'partner' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};