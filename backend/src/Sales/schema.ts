import { Customer } from '../Customer/schema';
import { SoldProduct } from '../SoldProduct/schema'; 
import { Payment } from '../Payment/schema';

export class Sale {
    userId: number;
    soldProducts: SoldProduct[];
    customer: Customer;
    date: string;
    payment?: Payment; 

    constructor(customer: Customer, date: string, userId: number) {
        this.userId = userId;
        this.soldProducts = [];
        this.customer = customer;
        this.date = date;
    }

    public addProduct(product: SoldProduct): void {
        this.soldProducts.push(product);
    }
    
    public associatePayment(payment: Payment): void {
        this.payment = payment;
    }
}