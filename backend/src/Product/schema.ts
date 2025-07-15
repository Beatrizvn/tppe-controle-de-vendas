import { Supplier } from '../Supplier/schema';

export class Product {
    userId: number; 
    code: string;
    name: string;
    sellingPrice: number;
    category: string;
    stockQuantity: number;
    supplier: Supplier;
    purchasePrice: number;

    constructor(
        user_id: number,
        code: string,
        name: string,
        sellingPrice: number,
        category: string,
        stockQuantity: number,
        supplier: Supplier,
        purchasePrice: number
    ) {
        this.userId = user_id; 
        this.code = code;
        this.name = name;
        this.sellingPrice = sellingPrice;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.supplier = supplier;
        this.purchasePrice = purchasePrice;
    }

    public checkStock(): number {
        console.log(`Checking stock for product ${this.name}. Available quantity: ${this.stockQuantity}`);
        return this.stockQuantity;
    }
}