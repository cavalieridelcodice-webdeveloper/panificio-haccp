import React from 'react';
import { 
  Wheat, Shrimp, Egg, Fish, Nut, Milk, Bean, Beef, Carrot, 
  Zap, FlaskConical, Dna, Shell, Trees 
} from 'lucide-react';
import { Allergen, Category, Product } from './types';

// --- LISTA ALLERGENI ---
export const ALLERGENS: Allergen[] = [
  { id: '1', name: 'Glutine', iconSlug: 'wheat', description: 'Cereali contenenti glutine' },
  { id: '2', name: 'Crostacei', iconSlug: 'shrimp', description: 'Crostacei e derivati' },
  { id: '3', name: 'Uova', iconSlug: 'egg', description: 'Uova e derivati' },
  { id: '4', name: 'Pesce', iconSlug: 'fish', description: 'Pesce e derivati' },
  { id: '5', name: 'Arachidi', iconSlug: 'peanut', description: 'Arachidi e derivati' },
  { id: '6', name: 'Soia', iconSlug: 'soy', description: 'Soia e derivati' },
  { id: '7', name: 'Latte', iconSlug: 'milk', description: 'Latte e derivati (incluso lattosio)' },
  { id: '8', name: 'Frutta a guscio', iconSlug: 'nuts', description: 'Mandorle, nocciole, noci, pistacchi' },
  { id: '9', name: 'Sedano', iconSlug: 'celery', description: 'Sedano e derivati' },
  { id: '10', name: 'Senape', iconSlug: 'mustard', description: 'Senape e derivati' },
  { id: '11', name: 'Sesamo', iconSlug: 'sesame', description: 'Semi di sesamo e derivati' },
  { id: '12', name: 'Solfiti', iconSlug: 'sulphites', description: 'Anidride solforosa > 10mg/kg' },
  { id: '13', name: 'Lupini', iconSlug: 'lupin', description: 'Lupini e derivati' },
  { id: '14', name: 'Molluschi', iconSlug: 'molluscs', description: 'Molluschi e derivati' },
];

// --- HELPER PER LE ICONE ---
export const getAllergenIcon = (slug: string) => {
  switch (slug) {
    case 'wheat': return <Wheat className="w-4 h-4" />;
    case 'shrimp': return <Shrimp className="w-4 h-4" />;
    case 'egg': return <Egg className="w-4 h-4" />;
    case 'fish': return <Fish className="w-4 h-4" />;
    case 'peanut': return <Nut className="w-4 h-4 rotate-45" />;
    case 'soy': return <Bean className="w-4 h-4" />;
    case 'milk': return <Milk className="w-4 h-4" />;
    case 'nuts': return <Trees className="w-4 h-4" />;
    case 'celery': return <Carrot className="w-4 h-4" />;
    case 'mustard': return <Zap className="w-4 h-4" />;
    case 'sesame': return <Dna className="w-4 h-4" />;
    case 'sulphites': return <FlaskConical className="w-4 h-4" />;
    case 'lupin': return <Trees className="w-4 h-4" />;
    case 'molluscs': return <Shell className="w-4 h-4" />;
    default: return <Zap className="w-4 h-4" />;
  }
};

// --- PRODOTTI DI ESEMPIO ---
export const SEED_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Pane di Altamura DOP', description: 'Pane di semola di grano duro, lievito madre, acqua e sale.', category: Category.PANE, allergens: ['1'], lastUpdated: new Date().toISOString() },
  { id: 'p2', name: 'Focaccia Barese Classica', description: 'Pasta morbida con pomodorini freschi, olive baresane e origano.', category: Category.FOCACCIA, allergens: ['1'], lastUpdated: new Date().toISOString() },
  { id: 'p3', name: 'Taralli al Finocchio', description: 'Snack croccante bollito e cotto al forno.', category: Category.TARALLI, allergens: ['1', '12'], lastUpdated: new Date().toISOString() },
  { id: 'p4', name: 'Cornetto alla Crema', description: 'Cornetto artigianale farcito con crema pasticcera.', category: Category.COLAZIONE, allergens: ['1', '3', '7'], lastUpdated: new Date().toISOString() },
  { id: 'p5', name: 'Panzerotto Fritto', description: 'Mezzaluna ripiena di pomodoro e mozzarella.', category: Category.GASTRONOMIA, allergens: ['1', '7'], lastUpdated: new Date().toISOString() },
];