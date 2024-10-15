'use client';

import { fetchRequest, HttpMethod } from '@/utils/fetch';

import type { ChatDetailDataResponse, ChatDetailResponse, ChatsDataResponse, ChatsResponse } from '@/types/chat';
import { config } from '@/config';

export interface ChatsDataResponse {
  _id: string;
  chatId: string;
  from: string;
  to: string;
  ProfileName: string;
  dateAdded: string;
  lastMessage: string;
  updatedAt: string;
}

export interface ChatsResponse {
  data: ChatsDataResponse[];
  success: boolean;
}

export interface ChatDetailDataResponse {
  _id: string;
  from: string;
  to: string;
  message: string;
  pauseByUser: boolean;
  dateAdded: string;
  updatedAt: string;
  chatId: string;
  type: 'MESSAGE' | 'PAUSE' | 'RESUME';
  origin: 'FRONTEND' | 'TWILIO' | 'IA';
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
    const { data, success } = await fetchRequest<ChatsResponse>(`${config.api.url}/chat`, HttpMethod.GET);
    if (success) {
      return { data };
    }
    return { error: 'Chats error' };
  }

  async getChatDetail(chatId: string): Promise<{ data?: ChatDetailDataResponse[]; error?: string }> {
    const { data, success } = await fetchRequest<ChatDetailResponse>(
      `${config.api.url}/history-message/${chatId}`,
      HttpMethod.GET
    );
    if (success) {
      return { data };
    }
    return { error: 'Chats Detail error' };
  }

  async sendChatMessage(message: string, to: string): Promise<{ data?: ChatDetailDataResponse; error?: string }> {
    const { data, success } = await fetchRequest<ChatSendMessageResponse>(
      `${config.api.url}/history-message`,
      HttpMethod.POST,
      {
        to,
        message,
        from: '+573105252119',
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
