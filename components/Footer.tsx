import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Intestazione Footer */}
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          © 2026 Panificio La Bella Bari | Via Pasubio 175, Bari
        </p>
        
        {/* Sottotitolo Legale */}
        <p className="text-slate-400 text-[9px] font-medium leading-relaxed max-w-2xl mx-auto mb-6">
          SISTEMA INFORMATIVO HACCP DIGITALE CONFORME AL REGOLAMENTO UE 1169/2011. 
          IL PRESENTE REGISTRO È AGGIORNATO COSTANTEMENTE PER GARANTIRE LA MASSIMA TRASPARENZA SUGLI ALLERGENI.
        </p>

        {/* Link Policy */}
        <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <button 
            type="button"
            onClick={() => alert('PRIVACY POLICY\nI dati trattati in questo sito sono limitati alla gestione del catalogo prodotti. Non vengono raccolti dati personali dei visitatori per finalità di profilazione o marketing.')}
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </button>
          
          <button 
            type="button"
            onClick={() => alert('COOKIE POLICY\nQuesto sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento della piattaforma e della dashboard di gestione. Non vengono utilizzati cookie di terze parti o di tracciamento.')}
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            Cookie Policy
          </button>
        </div>
      </div>
    </footer>
  );
};