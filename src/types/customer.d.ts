export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'pending' | 'active' | 'blocked';
  createdAt: Date;
}

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
  onEdit?: () => void;
}

export interface CustomerDto {
  email: string;
  name: string;
  phoneId: string;
}

export interface CustomersResponse {
  data: CustomersDataResponse[];
  success: boolean;
}

export interface CustomersUpdatePromptResponse {
  success: boolean;
}

export interface CustomersUpdateRAGResponse {
  success: boolean;
}
