import { Customer } from '../Customer/Customer';
import { SoldProduct } from './SoldProduct'; 
import { Payment } from '../Payment/Payment';

export class Sale {
    soldProducts: SoldProduct[];
    customer: Customer;
    date: string;
    payment?: Payment; 

    constructor(customer: Customer, date: string) {
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