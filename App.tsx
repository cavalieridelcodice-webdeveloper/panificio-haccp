import React, { useState, useEffect } from 'react';
import { Product, TabType } from './types';
import { db } from './src/db';
import { sql } from 'drizzle-orm';

// Componenti
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { UserDashboard } from './components/UserDashboard';
import { AllergenCatalog } from './components/AllergenCatalog';
import { ComplianceView } from './components/ComplianceView';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. SCORRIMENTO FLUIDO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // 2. CARICAMENTO DATI DA TURSO
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const result = await db.run(sql`SELECT * FROM products ORDER BY last_updated DESC`);
        
        // Trasformiamo i risultati da righe di database a oggetti Product
        const formattedProducts = result.rows.map(row => ({
          id: String(row.id),
          name: String(row.name),
          description: String(row.description || ''),
          category: String(row.category),
          // Trasformiamo la stringa degli allergeni di nuovo in Array
          allergens: JSON.parse(String(row.allergens || '[]')),
          lastUpdated: String(row.last_updated)
        })) as unknown as Product[];

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Errore nel caricamento da Turso:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 3. SALVATAGGIO SU TURSO
  const handleSaveProduct = async (p: Product) => {
    try {
      // Usiamo INSERT OR REPLACE (SQLite) per gestire sia nuovi che modifiche
      await db.run(sql`
        INSERT INTO products (id, name, description, category, allergens, last_updated)
        VALUES (
          ${p.id}, 
          ${p.name}, 
          ${p.description}, 
          ${p.category}, 
          ${JSON.stringify(p.allergens)}, 
          ${p.lastUpdated}
        )
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          description = excluded.description,
          category = excluded.category,
          allergens = excluded.allergens,
          last_updated = excluded.last_updated
      `);

      // Aggiorniamo lo stato locale per un feedback immediato
      setProducts(prev => {
        const exists = prev.find(x => x.id === p.id);
        return exists ? prev.map(x => x.id === p.id ? p : x) : [p, ...prev];
      });
    } catch (err) {
      console.error("Errore salvataggio Turso:", err);
      throw err; // Permette all'AdminPanel di mostrare l'errore
    }
  };

  // 4. ELIMINAZIONE DA TURSO
  const handleDeleteProduct = async (id: string) => {
    try {
      await db.run(sql`DELETE FROM products WHERE id = ${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Errore eliminazione Turso:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onPrint={() => window.print()} />

      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {isLoading && activeTab === 'products' ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView onExplore={() => setActiveTab('products')} />
            )}
            
            {activeTab === 'products' && <UserDashboard products={products} />}
            
            {activeTab === 'allergens' && <AllergenCatalog />}
            
            {activeTab === 'compliance' && <ComplianceView />}
            
            {activeTab === 'admin' && (
              <AdminPanel 
                products={products} 
                onSave={handleSaveProduct}
                onDelete={handleDeleteProduct}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}