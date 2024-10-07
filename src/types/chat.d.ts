export interface ChatDetailDataResponse {
  _id: string;
  from: string;
  to: string;
  message: string;
  pauseByUser: boolean;
  dateAdded: string;
  chatId: string;
  type: 'MESSAGE' | 'PAUSE' | 'RESUME';
  origin: 'FRONTEND' | 'TWILIO';
}

export interface ChatDetailResponse {
  data: ChatDetailDataResponse[];
  success: boolean;
}

export interface ChatsDataResponse {
  _id: string;
  chatId: string;
  from: string;
  to: string;
  ProfileName: string;
  dateAdded: string;
  lastMessage: string;
}

export interface ChatsResponse {
  data: ChatsDataResponse[];
  success: boolean;
}
