export interface Webinar {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube ID
  date: string;
  duration: string;
  thumbnail: string;
  topics: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum TabType {
  CHAT = 'CHAT',
  INFO = 'INFO',
  SUMMARY = 'SUMMARY'
}