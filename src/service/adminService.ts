import { GroceryRepository } from '../repository/groceryRepository';
const groceryRepository = new GroceryRepository();

export class AdminService {
    async addGroceryItem(data: { name: string; price: number; stock: number }) {
        return groceryRepository.createGroceryItem(data);
    }

    async getGroceryItems() {
        return groceryRepository.getAllGroceryItems();
    }

    async removeGroceryItem(id: string) {
        return groceryRepository.deleteGroceryItem(id);
    }

    async updateGroceryItem(id: string, data: Partial<{ name: string; price: number; stock: number }>) {
        return groceryRepository.updateGroceryItem(id, data);
    }
}