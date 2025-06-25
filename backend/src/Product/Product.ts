import { Supplier } from '../Supplier/Supplier';

export class Product {
    code: string;
    name: string;
    sellingPrice: number;
    category: string;
    stockQuantity: number;
    supplier: Supplier;
    purchasePrice: number;

    constructor(
        code: string,
        name: string,
        sellingPrice: number,
        category: string,
        stockQuantity: number,
        supplier: Supplier,
        purchasePrice: number
    ) {
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