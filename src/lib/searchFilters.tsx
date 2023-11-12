import { carBrands } from '../data/carBrands.json';

// Define the structure of a filter
export interface Filter {
  label: string;
  items: string[];
}

export type ActiveFilters = {
  [key in Filter['label']]?: string;
};

export const trackFilters: Filter[] = [
  {
    label: 'category',
    items: ['circuit', 'drift', 'touge', 'kart', 'rally', 'street'],
  },
  {
    label: 'type',
    items: ['loop', 'street', 'a to b'],
  },
];

export const carFilters: Filter[] = [
  {
    label: 'category',
    items: [
      'f1',
      'drift',
      'touge',
      'karting',
      'fictional',
      'nascar',
      'rally',
      'street',
      'racing',
    ],
  },
  {
    label: 'brand',
    items: carBrands,
  },
];
