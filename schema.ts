
/**
 * Schema definition for Drizzle ORM + Turso
 * Copy this into your Next.js project's db/schema.ts
 */

import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  lastUpdated: text('last_updated').notNull(),
});

export const allergens = sqliteTable('allergens', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  iconSlug: text('icon_slug').notNull(),
  description: text('description'),
});

// Junction table for Many-to-Many relationship
export const productAllergens = sqliteTable('product_allergens', {
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  allergenId: text('allergen_id').notNull().references(() => allergens.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.allergenId] }),
}));

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  allergens: many(productAllergens),
}));

export const allergensRelations = relations(allergens, ({ many }) => ({
  products: many(productAllergens),
}));

export const productAllergensRelations = relations(productAllergens, ({ one }) => ({
  product: one(products, {
    fields: [productAllergens.productId],
    references: [products.id],
  }),
  allergen: one(allergens, {
    fields: [productAllergens.allergenId],
    references: [allergens.id],
  }),
}));
