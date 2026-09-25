import { Unit } from '../types/product';

export const units: readonly Unit[] = [
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
  'Lot',
  'Project',
] as const;

export function isValidUnit(unit: string): boolean {
  return units.includes(unit as Unit);
}
