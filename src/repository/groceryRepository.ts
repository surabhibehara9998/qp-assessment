import pool from '../config/db';

export class GroceryRepository {
    async createGroceryItem(data: { name: string; price: number; stock: number }) {
        const result = await pool.query(
            'INSERT INTO groceries (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
            [data.name, data.price, data.stock]
        );
        return result.rows[0];
    }

    async getAllGroceryItems() {
        const result = await pool.query('SELECT * FROM groceries');
        return result.rows;
    }

    async deleteGroceryItem(id: string) {
        const result = await pool.query('DELETE FROM groceries WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) throw new Error('Item not found.');
    }

    async updateGroceryItem(id: string, data: Partial<{ name: string; price: number; stock: number }>) {
        const fields = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = Object.values(data);
        const result = await pool.query(
            `UPDATE groceries SET ${fields} WHERE id = $1 RETURNING *`,
            [id, ...values]
        );
        if (result.rowCount === 0) throw new Error('Item not found.');
        return result.rows[0];
    }

    async getAvailableGroceryItems() {
        const result = await pool.query('SELECT * FROM groceries WHERE stock > 0');
        return result.rows;
    }
}