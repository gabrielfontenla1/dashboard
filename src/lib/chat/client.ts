'use client';

import { fetchRequest, HttpMethod } from '@/utils/fetch';

import { config } from '@/config';

export interface ChatsResponse {
  _id: string;
  chatId: string;
  senderId: string;
  receptorId: string;
  ProfileName: string;
  dateAdded: string;
  lastMessage: string;
  __v: number;
}

export interface ChatDetailResponse {
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

const MOCKED = true;

class ChatClient {
  async getChats(): Promise<{ data?: ChatsResponse[]; error?: string }> {
    if (!MOCKED) {
      const data = await fetchRequest<ChatsResponse[]>(`${config.login.url}/chat`, HttpMethod.GET);
      return { data };
    }
    return Promise.resolve({
      data: [
        {
          _id: '66ec75dd303cede7e62764cb',
          chatId: '71d85cdc-61a9-4488-a166-8c573b7af785',
          senderId: '+573105252119',
          receptorId: '+573105252119',
          ProfileName: '+573105252119',
          dateAdded: '2024-09-19T19:04:47.704Z',
          lastMessage: 'primer mensaje',
          __v: 0,
        },
        {
          _id: '66ec7605303cede7e62764d3',
          chatId: '79579d07-075e-4b05-87cd-d0b0ae2f413f',
          senderId: '+573105252120',
          receptorId: '+573105252119',
          ProfileName: '+573105252120',
          dateAdded: '2024-09-19T19:04:47.704Z',
          lastMessage: 'segundo mensaje',
          __v: 0,
        },
        {
          _id: '66ec8289bdee42fe0e714d53',
          chatId: '3e86d294-ed11-4167-8f74-5eb61f4edc76',
          senderId: '+573105252234',
          receptorId: '+573105252119',
          ProfileName: '+573105252234',
          dateAdded: '2024-09-19T19:58:33.972Z',
          lastMessage: 'Hola',
          __v: 0,
        },
        {
          _id: '66ec8455bdee42fe0e714d5a',
          chatId: 'c2c4ae52-22cb-484c-aa17-49071de6da6c',
          senderId: '+57310521111',
          receptorId: '+573105252119',
          ProfileName: '+57310521111',
          dateAdded: '2024-09-19T19:58:33.972Z',
          lastMessage: 'Hola nuevo mensaje',
          __v: 0,
        },
      ],
      error: '',
    });
  }

  async getChatDetail(chatId: string): Promise<{ data?: ChatDetailResponse[]; error?: string }> {
    if (!MOCKED) {
      const data = await fetchRequest<ChatDetailResponse[]>(
        `${config.login.url}/history-message/${chatId}`,
        HttpMethod.GET
      );
      return { data };
    }

    return Promise.resolve({
      data: [
        {
          _id: '66ec75dd303cede7e62764cd',
          senderId: '+573105252119',
          receptorId: '+573105252119',
          message: 'primer mensaje',
          type: 'MESSAGE',
          pauseByUser: false,
          dateAdded: '2024-09-19T19:04:47.698Z',
          origin: 'FRONTEND',
          chatId: '71d85cdc-61a9-4488-a166-8c573b7af785',
          __v: 0,
        },
        {
          _id: '66ec75f7303cede7e62764d0',
          senderId: '+573105252119',
          receptorId: '+573105252119',
          message: 'segundo mensaje',
          type: 'MESSAGE',
          pauseByUser: false,
          dateAdded: '2024-09-19T19:04:47.698Z',
          origin: 'FRONTEND',
          chatId: '71d85cdc-61a9-4488-a166-8c573b7af785',
          __v: 0,
        },
        {
          _id: '66ec765a303cede7e62764d9',
          senderId: '+573105252119',
          receptorId: '+573105252119',
          message: 'tercer mensaje',
          type: 'MESSAGE',
          pauseByUser: false,
          dateAdded: '2024-09-19T19:04:47.698Z',
          origin: 'FRONTEND',
          chatId: '71d85cdc-61a9-4488-a166-8c573b7af785',
          __v: 0,
        },
        {
          _id: '66ec874ebdee42fe0e714d62',
          senderId: '+573105252119',
          receptorId: '+573105252119',
          message: 'Hola yulissa como estas?',
          type: 'MESSAGE',
          pauseByUser: false,
          dateAdded: '2024-09-19T19:58:33.967Z',
          origin: 'FRONTEND',
          chatId: '71d85cdc-61a9-4488-a166-8c573b7af785',
          __v: 0,
        },
      ],
      error: '',
    });
  }
}

export const chatClient = new ChatClient();
