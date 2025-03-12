import { drizzle } from 'drizzle-orm/libsql';
import { LOCAL_DB_PATH } from '../constants';
import * as userSchema from './user.schema';

const schema = {
    ...userSchema,
}

const db = drizzle<typeof schema>(`file:${LOCAL_DB_PATH}`);

export default db;