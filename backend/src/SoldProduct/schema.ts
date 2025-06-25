import { Product } from '../Product/schema';

export class SoldProduct {
    product: Product;
    quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}