
export interface BusinessCreateDTO {
  name: string;
  phone: string;
  email: string;
  owner: string;
  address: string;
  schedule: string;
  category: string;
  openTime: string;
  closeTime: string;
  subdomain: string;
  description: string;
  openDays: Array<String>;
}

export interface BusinessUpdateDTO {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  category?: string;
  openDays?: string;
  openTime?: string;
  schedule?: string;
  closeTime?: string;
  openTimes?: string;
}

export interface BusinessCreateResponseDTO extends BusinessCreateDTO { }