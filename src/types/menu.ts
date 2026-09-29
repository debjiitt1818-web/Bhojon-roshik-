export type DietType = 'veg' | 'non-veg' | 'egg';

export interface PortionPrice {
  half?: number;
  full: number;
}

export interface MenuItem {
  id: string;
  name: string;
  bengaliName?: string;
  category: 'rice' | 'roti' | 'main-course' | 'snacks' | 'noodles' | 'veg-sabzi' | 'dal-tarka';
  description: string;
  diet: DietType;
  price: PortionPrice | number; // number if single size, or PortionPrice if half/full
  pieces?: string; // e.g. "4 pcs", "6 pcs"
  isChefSpecial?: boolean;
  image?: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  portion: 'full' | 'half' | 'single';
  price: number;
  quantity: number;
  diet: DietType;
  notes?: string;
}

export type DeliveryAreaId = 'kankurgachi' | 'saltlake' | 'ultadanga' | 'newtown';

export interface DeliveryArea {
  id: DeliveryAreaId;
  name: string;
  bengaliName: string;
  description: string;
  popularSpots: string[];
  deliveryFee: number;
}

export interface OrderDetails {
  deliveryArea: DeliveryAreaId;
  deliveryDate: string; // YYYY-MM-DD (must be at least 2 days in advance)
  deliverySlot: 'lunch' | 'dinner' | 'custom';
  customTime?: string;
  specialInstructions?: string;
}
