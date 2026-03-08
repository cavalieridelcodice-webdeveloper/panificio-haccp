import React, { useState } from 'react';
import { Product } from '../types';
import { ALLERGENS } from '../constants';
import { Search, X } from 'lucide-react';

interface Props {
  products: Product[];
}

export const UserDashboard: React.FC<Props> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  // 2. Filtriamo i prodotti in base alla ricerca
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">I Nostri Prodotti</h2>
          <p className="text-slate-500 text-sm">Esplora il catalogo completo e gli allergeni.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Cerca prodotto o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm w-full md:w-[300px] 
                         focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <span className="shrink-0 bg-blue-100 text-blue-700 py-2 px-3 rounded-2xl text-xs font-bold shadow-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Prodotto' : 'Prodotti'}
          </span>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
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
                        <div key={allergenKey} className="group/icon relative flex items-center justify-center bg-white w-10 h-10 rounded-full shadow-sm text-xl border border-slate-100 cursor-help hover:scale-110 transition-transform z-10">
                          <span>{emoji}</span>
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[150px]
                                        bg-slate-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg
                                        opacity-0 translate-y-2 invisible
                                        group-hover/icon:opacity-100 group-hover/icon:translate-y-0 group-hover/icon:visible
                                        transition-all duration-200 pointer-events-none z-50 text-center">
                            {name}
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
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Nessun prodotto trovato</h3>
          <p className="text-slate-500">Prova con un termine diverso o cancella i filtri.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-6 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            Cancella ricerca
          </button>
        </div>
      )}
    </div>
  );
};