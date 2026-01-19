import React from 'react';
import { ShieldCheck, FileText, Scale, Users, CheckCircle2 } from 'lucide-react';

export const ComplianceView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Sezione */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Documentazione di Conformità</h2>
        <p className="text-slate-500">
          Protocolli di sicurezza alimentare e trasparenza verso il consumatore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Normativa UE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-blue-600">
            <Scale className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">Riferimenti Legislativi</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Reg. UE n. 1169/2011:</strong> Fornitura di informazioni sugli alimenti ai consumatori.</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span><strong>Reg. UE n. 852/2004:</strong> Igiene dei prodotti alimentari (HACCP).</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span><strong>D.Lgs. 231/2017:</strong> Disciplina sanzionatoria per la violazione delle disposizioni UE.</span>
            </li>
          </ul>
        </div>

        {/* Card Formazione Personale */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-blue-600">
            <Users className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-wider text-sm">Formazione e Sicurezza</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tutto il personale del <strong>Panificio La Bella Bari</strong> segue corsi periodici di aggiornamento sulla gestione degli allergeni e sulla prevenzione delle contaminazioni crociate durante le fasi di produzione e vendita.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-[11px] text-slate-500 italic">
              "La sicurezza alimentare è una responsabilità condivisa."
            </p>
          </div>
        </div>

      </div>

      {/* Informativa Consumatore - Importante per la Legge */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <FileText className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          Avviso Importante per i Soggetti Allergici
        </h3>
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed relative z-10">
          <p>
            Nonostante l'adozione di rigorosi protocolli di pulizia e separazione, nel nostro laboratorio artigianale <strong>non è possibile garantire l'assenza totale di tracce</strong> di allergeni per cross-contaminazione.
          </p>
          <p>
            Invitiamo i gentili clienti a segnalare al personale di vendita qualsiasi tipo di allergia o intolleranza grave prima di effettuare l'ordine. Il nostro registro degli ingredienti è sempre a vostra disposizione per la consultazione completa.
          </p>
        </div>
      </div>

      {/* Footer Tecnico */}
      <div className="text-center pt-4">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
          Ultima Revisione Protocollo: Gennaio 2026
        </p>
      </div>
    </div>
  );
};