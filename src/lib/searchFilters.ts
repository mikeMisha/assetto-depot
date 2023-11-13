import { carBrands } from '../data/carBrands.json';
import type { Filter } from '../../src/types/global';
// Define the structure of a filter

export const trackFilters: Filter[] = [
  {
    label: 'category',
    items: ['circuit', 'drift', 'touge', 'kart', 'rally', 'street'],
  },
  {
    label: 'track type',
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
