import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    BCRYPT_SOLD_ROUND: process.env.BCRYPT_SOLD_ROUND,
    CLOUDE_NAME: process.env.CLOUDE_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET
}