import mysql from "mysql2/promise";

interface DBConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
  connectionLimit?: number;
}

const databaseOptions: DBConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel_reservation",
  port: 3306,
  connectionLimit: 10,
};

const pool = mysql.createPool(databaseOptions);

export { pool }; 
