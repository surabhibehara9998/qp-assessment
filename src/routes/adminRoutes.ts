import express from 'express';
import { AdminController } from '../controller/adminController';
import { isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

const adminController = new AdminController();

router.post('/grocery', isAdmin, adminController.addGroceryItem);
router.get('/grocery', isAdmin, adminController.getGroceryItems);
router.delete('/grocery/:id', isAdmin, adminController.removeGroceryItem);
router.put('/grocery/:id', isAdmin, adminController.updateGroceryItem);

export { router as adminRoutes };