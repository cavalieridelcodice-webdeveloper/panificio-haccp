import React from 'react';
import { ALLERGENS } from '../constants';

// Definiamo la funzione qui dentro, così non deve caricarla da fuori
const getIcon = (slug: string) => {
  switch (slug) {
    case 'wheat': return '🌾';
    case 'shrimp': return '🦐';
    case 'egg': return '🥚';
    case 'fish': return '🐟';
    case 'peanut': return '🥜';
    case 'soy': return '🫛';
    case 'milk': return '🥛';
    case 'nuts': return '🌰';
    case 'celery': return '🌿';
    case 'mustard': return '🟡';
    case 'sesame': return '🥯';
    case 'sulphites': return '🍷';
    case 'lupin': return '🥙';
    case 'molluscs': return '🐚';
    default: return '⚠️';
  }
};

export const AllergenCatalog: React.FC = () => {
  return (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">Registro Allergeni</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ALLERGENS.map((allergen) => (
          <div key={allergen.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="text-4xl mb-4 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">
              {getIcon(allergen.iconSlug)}
            </div>
            <h3 className="font-bold text-slate-800 text-sm">{allergen.name}</h3>
            <p className="text-[10px] text-slate-400 mt-2 uppercase font-semibold">
              {allergen.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};