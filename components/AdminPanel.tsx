import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Lock, CheckCircle2 } from 'lucide-react';
import { Product, Category } from '../types';
import { ALLERGENS } from '../constants';

interface AdminPanelProps {
  products: Product[];
  onSave: (product: Product) => Promise<void>; // Nota: ora è una Promise
  onDelete: (id: string) => Promise<void>;     // Nota: ora è una Promise
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ products, onSave, onDelete }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: Category.PANE,
    allergens: []
  });

  const CORRECT_PASSWORD = 'Rockybalboa89+';

  // --- Feedback Audio ---
  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // --- Gestione Login ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      playSound('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      setIsAuthenticated(true);
      triggerToast("Bentornato nel sistema!");
    } else {
      setLoginError(true);
      setPasswordInput('');
    }
  };

  const handleToggleAllergen = (id: string) => {
    const current = formData.allergens || [];
    setFormData({
      ...formData,
      allergens: current.includes(id) 
        ? current.filter(a => a !== id) 
        : [...current, id]
    });
  };

  // --- NUOVA FUNZIONE DI SALVATAGGIO PER TURSO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productToSave = {
      ...formData,
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString()
    } as Product;

    try {
      // Aspettiamo che il database su Turso confermi il salvataggio
      await onSave(productToSave);
      
      playSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      triggerToast(editingProduct ? "Modifiche salvate su Turso!" : "Prodotto aggiunto al database!");
      resetForm();
    } catch (error) {
      console.error("Errore Turso:", error);
      triggerToast("Errore di connessione al database!");
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', category: Category.PANE, allergens: [] });
    setIsFormOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg"><Lock className="w-8 h-8" /></div>
          <h2 className="text-2xl font-black text-slate-900">Area Riservata</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" placeholder="Password"
              className={`w-full p-4 border rounded-2xl text-center outline-none ${loginError ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
              value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">Accedi</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-sm font-bold">{showToast}</span>
        </div>
      )}

      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-2xl font-bold text-slate-900">Gestione Catalogo</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Nuovo Prodotto
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-3xl border-2 border-blue-500 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">{editingProduct ? '📝 Modifica' : '✨ Nuovo'} Prodotto</h3>
            <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5"/></button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Nome prodotto" className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required
              />
              <select 
                className="w-full p-3 border border-slate-200 rounded-xl outline-none"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <textarea 
              placeholder="Ingredienti e dettagli..." className="w-full p-3 border border-slate-200 rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
            />

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Seleziona Allergeni</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {ALLERGENS.map(a => (
                  <button
                    key={a.id} type="button"
                    onClick={() => handleToggleAllergen(a.id)}
                    className={`p-3 text-[10px] border rounded-xl transition-all font-bold ${formData.allergens?.includes(a.id) ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg transition-all">
              <Save className="w-5 h-5"/> {editingProduct ? 'Salva Modifiche' : 'Aggiungi al Catalogo'}
            </button>
          </form>
        </div>
      )}

      {/* Tabella di riepilogo */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Prodotto</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingProduct(p); setFormData(p); setIsFormOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4"/></button>
                    <button 
                      onClick={async () => { 
                        if(window.confirm("Vuoi davvero eliminare questo prodotto dal database?")) { 
                          await onDelete(p.id); 
                          triggerToast("Eliminato definitivamente!"); 
                        } 
                      }} 
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};