import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10),
    database: process.env.DATABASE_NAME,
})