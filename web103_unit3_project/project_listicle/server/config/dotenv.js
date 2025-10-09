import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), 'server', '.env');
dotenv.config({ path: envPath });

export default process.env;
