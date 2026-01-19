// Definiamo i tab della navigazione (risolve l'errore ts(2305) in App.tsx)
export type TabType = 'home' | 'products' | 'allergens' | 'compliance' | 'admin';

export interface Allergen {
  id: string;
  name: string;
  iconSlug: string;
  description: string;
}

export enum Category {
  PANE = 'Pane',
  FOCACCIA = 'Focaccia e Pizza',
  TARALLI = 'Taralli e Snack',
  PASTICCERIA = 'Pasticceria Secca',
  COLAZIONE = 'Colazione',
  GASTRONOMIA = 'Gastronomia'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  // Usiamo l'enum Category invece di string per maggiore sicurezza
  category: Category; 
  allergens: string[]; // Array di ID degli allergeni
  lastUpdated: string;
}