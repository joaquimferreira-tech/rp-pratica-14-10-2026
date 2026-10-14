import { pool } from "../config/db.js"

class FrutasServices {
    async getAll() {
        const res = await pool.query('SELECT * FROM public.frutas')
        return res.rows
    }
}

export const frutasServices = new FrutasServices()