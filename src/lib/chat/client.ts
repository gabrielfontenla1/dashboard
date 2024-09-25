'use client';

import { fetchRequest, HttpMethod } from '@/utils/fetch';

import { config } from '@/config';

export interface ChatsDataResponse {
  _id: string;
  chatId: string;
  senderId: string;
  receptorId: string;
  ProfileName: string;
  dateAdded: string;
  lastMessage: string;
  __v: number;
}

export interface ChatsResponse {
  data: ChatsDataResponse[];
  success: boolean;
}

export interface ChatDetailDataResponse {
  _id: string;
  senderId: string;
  receptorId: string;
  message: string;
  type: 'MESSAGE' | 'PAUSE' | 'RESUME';
  pauseByUser: boolean;
  dateAdded: string;
  origin: 'FRONTEND' | 'TWILIO';
  chatId: string;
  __v: number;
}

export interface ChatDetailResponse {
  data: ChatDetailDataResponse[];
  success: boolean;
}

export interface ChatSendMessageResponse {
  data: ChatDetailDataResponse;
  success: boolean;
}

class ChatClient {
  async getChats(): Promise<{ data?: ChatsDataResponse[]; error?: string }> {
    const { data, success } = await fetchRequest<ChatsResponse>(`${config.login.url}/chat`, HttpMethod.GET);
    if (success) {
      return { data };
    }
    return { error: 'Chats error' };
  }

  async getChatDetail(chatId: string): Promise<{ data?: ChatDetailDataResponse[]; error?: string }> {
    const { data, success } = await fetchRequest<ChatDetailResponse>(
      `${config.login.url}/history-message/${chatId}`,
      HttpMethod.GET
    );
    if (success) {
      return { data };
    }
    return { error: 'Chats Detail error' };
  }

  async sendChatMessage(
    message: string,
    receptorId: string
  ): Promise<{ data?: ChatDetailDataResponse; error?: string }> {
    const { data, success } = await fetchRequest<ChatSendMessageResponse>(
      `${config.login.url}/history-message`,
      HttpMethod.POST,
      {
        receptorId,
        message,
        senderId: '+573105252119',
        type: 'MESSAGE',
        origin: 'FRONTEND',
        pauseByUser: false,
      }
    );
    if (success) {
      return { data };
    }
    return { error: 'Chats Detail error' };
  }
}

export const chatClient = new ChatClient();
