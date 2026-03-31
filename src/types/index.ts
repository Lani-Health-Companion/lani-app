export interface Profile {
  id: string;
  phone?: string;
  displayName?: string;
  dateOfBirth?: string;
  zipCode?: string;
  interests?: string[];
  lonelinessScore?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  createdAt: string;
  messages?: Message[];
}

export interface Assessment {
  id: string;
  userId: string;
  assessmentType: 'UCLA3' | 'PHQ2' | 'GAD2';
  score: number;
  responses?: Record<string, any>;
  createdAt: string;
}

export interface UserMatch {
  id: string;
  userA: string;
  userB: string;
  status: 'pending' | 'accepted' | 'declined';
  matchScore?: number;
  createdAt: string;
}

export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  phone: string;
  relationship?: string;
  isPrimary?: boolean;
  createdAt: string;
}
