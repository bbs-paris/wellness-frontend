export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  winners: number;
  partnerId: string;
  status: 'active' | 'completed' | 'draft';
  createdAt: Date;
  endDate: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'partner';
  createdAt: Date;
}

export interface Submission {
  id: string;
  challengeId: string;
  userId: string;
  mediaUrl: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}