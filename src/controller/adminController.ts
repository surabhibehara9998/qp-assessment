import { Request, Response } from 'express';
import { AdminService } from '../service/adminService';

const adminService = new AdminService();

export class AdminController {
    async addGroceryItem(req: Request, res: Response) {
        try {
            const newItem = await adminService.addGroceryItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getGroceryItems(req: Request, res: Response) {
        const items = await adminService.getGroceryItems();
        res.json(items);
    }

    async removeGroceryItem(req: Request, res: Response) {
        try {
            await adminService.removeGroceryItem(req.params.id);
            res.status(200).send('Item removed successfully.');
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    async updateGroceryItem(req: Request, res: Response) {
        try {
            const updatedItem = await adminService.updateGroceryItem(req.params.id, req.body);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
}
