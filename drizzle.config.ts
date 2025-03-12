import { defineConfig } from "drizzle-kit";
import { LOCAL_DB_PATH } from "./src/constants";

let config: ReturnType<typeof defineConfig>;
config = defineConfig({
	out: "./src/db/generated-sql",
	schema: "./src/**/*.schema.ts",
	dialect: "sqlite",
	dbCredentials: { url: `file:${LOCAL_DB_PATH}` }
});
export default config;
