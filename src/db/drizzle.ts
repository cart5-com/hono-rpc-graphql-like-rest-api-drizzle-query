import { drizzle } from 'drizzle-orm/libsql';
import { LOCAL_DB_PATH } from '../constants';
import * as userSchema from './user.schema';

const schema = {
    ...userSchema,
}
export default drizzle<typeof schema>(`file:${LOCAL_DB_PATH}`, { schema });