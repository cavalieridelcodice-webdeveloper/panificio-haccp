import React from 'react';
import { Home, ListChecks, AlertTriangle, BookOpen, Settings, Printer } from 'lucide-react';
import { TabType } from '../types'; // Assicurati che il percorso sia corretto

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onPrint }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'products', label: 'Prodotti', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'allergens', label: 'Allergeni UE', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'compliance', label: 'HACCP', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'admin', label: 'Gestione', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-30 print:hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase whitespace-nowrap border-b-2 transition-all
                ${activeTab === tab.id ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <button 
          onClick={onPrint}
          className="ml-4 bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};