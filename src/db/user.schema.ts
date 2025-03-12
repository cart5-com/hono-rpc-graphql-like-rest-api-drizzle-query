import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

export const usersTable = sqliteTable("users_table", {
  id: text("id").notNull().primaryKey().unique().$defaultFn(() => crypto.randomUUID()),
  email: text().notNull().unique(),
  name: text(),
  age: int(),
});

export const userInsertSchema = createInsertSchema(usersTable);
export const userSelectSchema = createSelectSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);

// one to one relationship
export const userAddressTable = sqliteTable("user_address_table", {
  userId: text("user_id").notNull().unique(),
  address1: text("address_1"),
  address2: text("address_2"),
  city: text("city"),
  state: text("state"), 
  postalCode: text("postal_code"),
  country: text("country"),
  lat: real('lat'),
  lng: real('lng'),
});

export const userAddressInsertSchema = createInsertSchema(userAddressTable);
export const userAddressSelectSchema = createSelectSchema(userAddressTable);
export const userAddressUpdateSchema = createUpdateSchema(userAddressTable);


export const userRelations = relations(usersTable, ({
  one,
  // many
}) => ({
	address:
		one(
			userAddressTable, {
			fields: [usersTable.id],
			references: [userAddressTable.userId]
		}),
}));