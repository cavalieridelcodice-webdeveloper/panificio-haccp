import React, { useState } from 'react';
import { Search, Info, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Product } from '../types';
import { ALLERGENS, getAllergenIcon } from '../constants';

interface UserDashboardProps {
  products: Product[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      
      {/* SEZIONE RICERCA E LEGENDA (Invariata) */}
      <div className="sticky top-4 z-30 space-y-2">
        <div className="relative max-w-2xl mx-auto shadow-lg rounded-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cerca prodotto..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="w-full bg-white/90 backdrop-blur border border-slate-200 p-3 rounded-xl flex items-center justify-between text-sm font-bold text-slate-600 shadow-sm hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Legenda Allergeni</span>
            {isLegendOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isLegendOpen && (
            <div className="mt-2 bg-white p-4 rounded-2xl border border-blue-100 shadow-xl animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ALLERGENS.map((allergen) => (
                  <div key={allergen.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <div className="text-red-500 bg-white p-1 rounded-md border border-red-100">
                      {getAllergenIcon(allergen.iconSlug)}
                    </div>
                    <span className="text-xs font-medium text-slate-700">{allergen.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GRIGLIA PRODOTTI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{product.description}</p>
            
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Allergeni Presenti</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.allergens.length > 0 ? (
                  product.allergens.map(aid => {
                    const allergen = ALLERGENS.find(a => a.id === aid);
                    return (
                      // --- QUI È LA MODIFICA PER L'HOVER ---
                      <div 
                        key={aid} 
                        className="group/icon relative flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-100 hover:scale-110 transition-all cursor-pointer"
                      >
                        {/* L'icona è sempre visibile */}
                        {getAllergenIcon(allergen?.iconSlug || '')}
                        
                        {/* Questo SPAN appare solo in HOVER */}
                        <span className="absolute bottom-full mb-2 hidden group-hover/icon:block whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200">
                          {allergen?.name}
                          {/* Triangolino sotto il tooltip */}
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-xs italic text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 font-medium">
                    Nessun allergene
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};