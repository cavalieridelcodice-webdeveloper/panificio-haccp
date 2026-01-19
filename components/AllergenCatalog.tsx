import React from 'react';
import { ALLERGENS } from '../constants';
import { 
  Wheat, Milk, Egg, Fish, Nut, Leaf, CircleDot, 
  Bean, Waves, Shell, Pipette, Biohazard, Info 
} from 'lucide-react';

// Helper per le icone (centralizzato nel componente)
const getAllergenIcon = (slug: string) => {
  const p = { className: "w-6 h-6" };
  switch (slug) {
    case 'wheat': return <Wheat {...p} />;
    case 'milk': return <Milk {...p} />;
    case 'egg': return <Egg {...p} />;
    case 'fish': return <Fish {...p} />;
    case 'nut': return <Nut {...p} />;
    case 'leaf': return <Leaf {...p} />;
    case 'bean': return <Bean {...p} />;
    case 'waves': return <Waves {...p} />;
    case 'shell': return <Shell {...p} />;
    case 'circledot': return <CircleDot {...p} />;
    case 'pipette': return <Pipette {...p} />;
    default: return <Biohazard {...p} />;
  }
};

export const AllergenCatalog: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header della Sezione */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Catalogo Allergeni UE</h2>
        <p className="text-slate-500 text-sm">
          In conformità all'Allegato II del Reg. UE n. 1169/2011, di seguito sono riportate le 14 sostanze o prodotti che possono provocare allergie o intolleranze.
        </p>
      </div>

      {/* Info Alert per HACCP */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-4 max-w-4xl mx-auto">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-sm text-blue-800">
          <p className="font-bold mb-1">Nota informativa per il consumatore</p>
          <p>Le informazioni sugli allergeni presenti nei nostri prodotti sono costantemente aggiornate. In caso di dubbi o allergie gravi, invitiamo a consultare il personale prima del consumo.</p>
        </div>
      </div>

      {/* Griglia degli Allergeni */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ALLERGENS.map((allergen) => (
          <div 
            key={allergen.id} 
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-200 hover:shadow-md transition-all group flex flex-col items-center text-center"
          >
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              {getAllergenIcon(allergen.iconSlug)}
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{allergen.name}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              {allergen.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer tecnico per ispezioni */}
      <div className="mt-12 text-center border-t pt-8 print:block hidden">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
          Documento allegato al Piano di Autocontrollo (HACCP) - Panificio La Bella Bari
        </p>
      </div>
    </div>
  );
};