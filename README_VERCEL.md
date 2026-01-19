
# Configurazione Turso + Vercel (Next.js)

Se desideri migrare questa applicazione su un'architettura reale con Turso, segui questi passaggi:

### 1. Creazione Database Turso
- Vai su [turso.tech](https://turso.tech) e crea un nuovo database SQLite (libSQL).
- Copia la **Database URL** e il **Auth Token**.

### 2. Variabili d'Ambiente su Vercel
Nel pannello di controllo di Vercel, aggiungi le seguenti chiavi:
- `TURSO_DATABASE_URL`: La URL del tuo database (es. `libsql://your-db-name.turso.io`).
- `TURSO_AUTH_TOKEN`: Il token generato da Turso.

### 3. Configurazione Drizzle
Nel tuo progetto Next.js:
1. Installa i pacchetti: `npm install drizzle-orm @libsql/client`
2. Configura il client Drizzle usando `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN`.
3. Usa il file `schema.ts` fornito in questa app per generare le migrazioni.

### 4. Seed Iniziale
Puoi usare la costante `SEED_PRODUCTS` fornita in `constants.tsx` per popolare il database Turso tramite un'API route o uno script di migrazione `ts-node`.

### 5. API Routes (CRUD)
In Next.js (App Router), crea `/app/api/products/route.ts`:
- **GET**: Ritorna `db.select().from(products)`.
- **POST**: Inserisce `db.insert(products).values(data)`.
- **DELETE**: Rimuove `db.delete(products).where(eq(products.id, id))`.
