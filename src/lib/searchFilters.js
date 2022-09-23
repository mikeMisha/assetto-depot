import carBrands from './carBrands';
export const trackFilters = [
  {
    label: 'category',
    items: ['circuit', 'drift', 'touge', 'kart', 'rally', 'street'],
  },
  {
    label: 'type',
    items: ['loop', 'street', 'a to b'],
  },
];

export const carFilters = [
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
    ],
  },
  {
    label: 'brand',
    items: carBrands,
  },
];
