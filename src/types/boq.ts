export interface BoqHeader {
  clientName: string;
  date: string; // ISO format
  projectDetail: string;
  salesPerson: string;
  location: string;
  version: string;
  subject: string;
}

export interface BoqItem {
  id: string;
  productId: string;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitRate: number;
  gstPercentage: number;
  gstAmount: number;
  rateIncludingTax: number;
  totalAmount: number;
}

export interface BoqData {
  header: BoqHeader;
  items: BoqItem[];
}

export interface BoqSummary {
  itemCount: number;
  subtotal: number;
  totalGst: number;
  grandTotal: number;
}

export interface BoqState {
  header: BoqHeader;
  items: BoqItem[];
  currentItem: Partial<BoqItem> | null;
  isEditing: boolean;
  editingId: string | null;
}

export type BoqAction =
  | { type: 'UPDATE_HEADER'; payload: Partial<BoqHeader> }
  | { type: 'ADD_ITEM'; payload: BoqItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; data: Partial<BoqItem> } }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'REORDER_ITEMS'; payload: BoqItem[] }
  | { type: 'START_EDIT'; payload: string }
  | { type: 'CANCEL_EDIT' }
  | { type: 'RESET' }
  | { type: 'LOAD_DRAFT'; payload: BoqData };
