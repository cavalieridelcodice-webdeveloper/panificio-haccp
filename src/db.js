import { createClient } from '@libsql/client/web'; // Aggiungi /web alla fine
import { drizzle } from 'drizzle-orm/libsql';

const url = import.meta.env.VITE_TURSO_DATABASE_URL;
const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN;

// Questo log ti aiuterà a capire se Vite sta leggendo i dati (controlla in console)
console.log("Connessione a Turso in corso...");

export const client = createClient({
  url: url || "",
  authToken: authToken || "",
});

export const db = drizzle(client);