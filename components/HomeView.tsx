import React from 'react';
import { Clock, MapPin, Phone, Star, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  onExplore: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onExplore }) => {
  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/30">
            <Star className="w-3 h-3 fill-current" /> Tradizione Barese 
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            L'arte del pane, <br />
            <span className="text-blue-500">in totale sicurezza.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Benvenuti nel registro digitale del Panificio La Bella Bari. Qui puoi consultare ogni ingrediente e allergene dei nostri prodotti artigianali, garantendo una scelta sicura per te e la tua famiglia.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Orari di Apertura</h3>
          <p className="text-sm text-slate-500">Lun - Ven: 07:00 - 14:00 / 17:00 - 21:00</p>
          <p className="text-sm text-slate-500 font-bold mt-1 text-red-500">Sabato: 07:00 - 14:00</p>
          <p className="text-sm text-slate-500 font-bold mt-1 text-red-500">Domenica: Chiuso</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Dove Siamo</h3>
          <p className="text-sm text-slate-500">Via Pasubio 175</p>
          <p className="text-sm text-slate-500">70125 Bari (BA)</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Contattaci</h3>
          <p className="text-sm text-slate-500">Tel: +39 3889788780</p>
          <p className="text-sm text-slate-500">Email: panificiolabellabari@gmail.com</p>
        </div>
      </div>

      {/* HACCP Banner con pulsante funzionante */}
      <div className="bg-green-50 border border-green-100 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-600 p-3 rounded-2xl text-white shadow-lg shadow-green-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-green-900">Catalogo Allergeni Certificato</h4>
            <p className="text-sm text-green-700">Aggiornato in tempo reale secondo le normative vigenti.</p>
          </div>
        </div>
        <button 
          onClick={onExplore}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
        >
          Esplora Prodotti <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};