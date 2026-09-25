export interface Product {
  id: string;
  name: string;
  description: string;
  defaultUnit: string;
  defaultRate: number;
  gstPercentage: number;
  category?: string;
  active: boolean;
}

export type Unit = string;

export const UNIT_OPTIONS: readonly Unit[] = [
  'Nos',
  'Meter',
  'Pair',
  'Set',
  'Feet',
  'Kg',
  'Ltr',
  'Sq Ft',
  'Sq Meter',
  'Box',
  'Unit',
] as const;
