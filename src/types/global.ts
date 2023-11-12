export interface Track {
  id: string;
  name: string;
  credit?: string;
  image?: string;
  likes?: number;
  dislikes?: number;
  downloads?: number;
  downloadLink?: string;
  brand?: string;
  location?: string;
  category?: string;
  trans?: string;
  version?: string;
  type: 'cars' | 'tracks';
  description?: string;
}

export interface Car {
  id: string;
  brand: string;
  name: string;
  image: string;
  downloadLink: string;
  dislikes: number;
  downloads: number;
  trans: 'auto' | 'manual';
  credit: string;
  category: string;
}

export interface Filter {
  label: string;
  items: string[];
}

export type ActiveFilters = {
  [key in Filter['label']]?: string;
};
