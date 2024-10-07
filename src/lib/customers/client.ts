'use client';

import { fetchRequest, HttpMethod } from '@/utils/fetch';

import type {
  CustomerDto,
  CustomersDataResponse,
  CustomersResponse,
  CustomersUpdatePromptResponse,
} from '@/types/customer';
import { config } from '@/config';

/**
 * CustomersClient to call the API for customer actions
 */
class CustomersClient {
  async getCustomers(): Promise<{ data?: CustomersDataResponse[]; error?: string }> {
    const { data, success } = await fetchRequest<CustomersResponse>(`${config.api.url}/client`, HttpMethod.GET);
    if (success) {
      return { data };
    }
    return { error: 'Clients error' };
  }

  async updateCustomer(customer: CustomerDto): Promise<{ data?: CustomersDataResponse[]; error?: string }> {
    const { data, success } = await fetchRequest<CustomersResponse>(
      `${config.api.url}/client/update`,
      HttpMethod.PUT,
      customer
    );
    if (success) {
      return { data };
    }
    throw new Error('Error updating customer');
  }

  async createCustomer(customer: CustomerDto): Promise<{ data?: any; error?: string }> {
    const { data, success } = await fetchRequest<CustomersResponse>(
      `${config.api.url}/client/save`,
      HttpMethod.POST,
      customer
    );
    if (success) {
      return { data };
    }
    throw new Error('Error saving customer');
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
