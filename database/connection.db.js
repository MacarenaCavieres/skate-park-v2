import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.PG_KEY;

export const pool = new Pool({
    connectionString,
    allowExitOnIdle: true,
});

try {
    await pool.query("select now()");
    console.log("Database on fire 🔥🔥🔥");
} catch (error) {
    console.log("Error ", e);
}
