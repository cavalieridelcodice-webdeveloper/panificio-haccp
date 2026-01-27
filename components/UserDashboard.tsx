import React from 'react';
import { Product } from '../types';
import { ALLERGENS } from '../constants';

interface Props {
  products: Product[];
}

export const UserDashboard: React.FC<Props> = ({ products }) => {
  
  // 1. Funzione che recupera TUTTI i dati dell'allergene (Icona e Nome)
  const getAllergenData = (code: string) => {
    // Cerca l'allergene nell'elenco usando l'ID oppure lo slug
    const found = ALLERGENS.find(a => a.id === code || a.iconSlug === code);
    
    if (found) {
      // Se lo troviamo, restituiamo i dati reali
      // Mappa delle emoji
      const icons: Record<string, string> = {
        wheat: '🌾', shrimp: '🦐', egg: '🥚', fish: '🐟',
        peanut: '🥜', soy: '🫛', milk: '🥛', nuts: '🌰',
        celery: '🌿', mustard: '🟡', sesame: '🥯',
        sulphites: '🍷', lupin: '🥙', molluscs: '🐚'
      };
      return { 
        emoji: icons[found.iconSlug] || '⚠️', 
        name: found.name 
      };
    }
    
    // Fallback se non lo troviamo
    return { emoji: '⚠️', name: 'Sconosciuto' };
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">I Nostri Prodotti</h2>
        <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold shadow-sm">
          {products.length} A listino
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-visible">
            
            {/* Intestazione Card */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </div>
            </div>
            
            {/* Descrizione */}
            <p className="text-slate-500 text-sm mb-6 leading-relaxed min-h-[40px]">
              {product.description}
            </p>
            
            {/* Sezione Allergeni */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Allergeni Presenti
              </p>
              
              <div className="flex flex-wrap gap-3">
                {product.allergens && product.allergens.length > 0 ? (
                  product.allergens.map((allergenKey) => {
                    // Recuperiamo dati (emoji e nome) per ogni allergene
                    const { emoji, name } = getAllergenData(allergenKey);
                    
                    return (
                      // "group/icon" serve per gestire l'hover specifico su questa icona
                      <div key={allergenKey} className="group/icon relative flex items-center justify-center bg-white w-10 h-10 rounded-full shadow-sm text-xl border border-slate-100 cursor-help hover:scale-110 transition-transform z-10">
                        
                        {/* L'Icona */}
                        <span>{emoji}</span>

                        {/* IL TOOLTIP (L'etichetta che appare) */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[150px]
                                      bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg
                                      opacity-0 translate-y-2 invisible
                                      group-hover/icon:opacity-100 group-hover/icon:translate-y-0 group-hover/icon:visible
                                      transition-all duration-200 pointer-events-none z-50 text-center">
                          {name}
                          {/* La freccetta sotto l'etichetta */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                        </div>

                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center gap-2 text-green-600 bg-green-100/50 px-3 py-1.5 rounded-lg border border-green-100">
                    <span className="text-lg">✅</span>
                    <span className="text-xs font-bold uppercase">Sicuro</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};