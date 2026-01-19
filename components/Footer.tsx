import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="p-8 text-center text-slate-400 text-[10px] uppercase tracking-widest border-t bg-white print:mt-10">
      <div className="max-w-7xl mx-auto">
        <p className="font-bold text-slate-500 mb-1">
          © 2026 Panificio La Bella Bari | Via Pasubio 175, Bari
        </p>
        <p>
          Sistema Informativo HACCP Digitale conforme al Regolamento UE 1169/2011
        </p>
        <div className="mt-4 flex justify-center gap-4 print:hidden">
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Registro Certificato</span>
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">Aggiornato Gennaio 2026</span>
        </div>
      </div>
    </footer>
  );
};