import { Payment } from './Payment';

export class UpfrontPayment extends Payment {
    discountAmount: number;
    finalAmount: number;

    constructor(date: string, totalAmount: number, discountPercentage: number) {
        super(date);
        this.discountAmount = (totalAmount * discountPercentage) / 100;
        this.finalAmount = this.calculateTotalAfterDiscount(totalAmount);
    }

    public calculateTotalAfterDiscount(totalAmount: number): number {
        return totalAmount - this.discountAmount;
    }
}