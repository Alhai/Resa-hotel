declare module '../config/config'

interface DBConfig{
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number; 
    connectionLimit? : number;
}

const dbConfig : DBConfig
export default dbConfig;