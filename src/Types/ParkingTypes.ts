export type SlotStatus = 'free' | 'booked' | 'reserved' | 'unavailable' | 'named';

export interface ParkingSlot {
  id: string;
  status: SlotStatus;
  building?: string;
  block?: string;
  level?: string;
  prefix?: string;
  isSpecial?: boolean;
  notes?: string;
  namedFor?: string;
}

export const BUILDINGS: Record<string, string> = {
  'Athulya, Kochi': 'KAT',
  'Thejaswini, Trivandrum': 'TTJ',
  'Gayatri, Trivandrum': 'TGY'
};