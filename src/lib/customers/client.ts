'use client';

import { fetchRequest, HttpMethod } from '@/utils/fetch';

import { config } from '@/config';

export interface CustomersDataResponse {
  email: string;
  id: number;
  name: string;
  phoneId: string;
  prompt: string;
  ragRoute: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomersDataTable {
  email: string;
  id: number;
  name: string;
  phoneId: string;
  prompt: string;
  ragRoute: string;
  createdAt: string;
  updatedAt: string;
  onUploadPrompt?: () => void;
  onUploadRAG?: () => void;
}

export interface CustomersResponse {
  data: CustomersDataResponse[];
  success: boolean;
}

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

export interface CustomersUpdatePromptResponse {
  success: boolean;
}

export interface CustomersUpdateRAGResponse {
  success: boolean;
}

class CustomersClient {
  async getCustomers(): Promise<{ data?: CustomersDataResponse[]; error?: string }> {
    const { data, success } = await fetchRequest<CustomersResponse>(`${config.api.url}/client`, HttpMethod.GET);
    if (success) {
      return { data };
    }
    return { error: 'Clients error' };
  }

  async updatePrompt(
    clientId: number,
    prompt: string
  ): Promise<{ success?: CustomersUpdatePromptResponse; error?: string }> {
    const success = await fetchRequest<CustomersUpdatePromptResponse>(
      `${config.api.url}/client/prompt`,
      HttpMethod.POST,
      {
        clientId,
        prompt,
      }
    );
    if (success) {
      return { success };
    }
    return { error: 'Client Prompt Error' };
  }

  async updateRAG(
    clientId: number,
    base64: string
  ): Promise<{ success?: CustomersUpdatePromptResponse; error?: string }> {
    const success = await fetchRequest<CustomersUpdatePromptResponse>(`${config.api.url}/client/rag`, HttpMethod.POST, {
      clientId,
      base64,
    });
    if (success) {
      return { success };
    }
    return { error: 'Client RAG Error' };
  }
}

export const customersClient = new CustomersClient();
