import { Payment } from "../schema";

export class InstallmentPayment extends Payment {
    numberOfInstallments: number;
    interestRate: number; // Interest rate in percentage

    constructor(date: string, numberOfInstallments: number, interestRate: number) {
        super(date); 
        this.numberOfInstallments = numberOfInstallments;
        this.interestRate = interestRate;
    }

    public calculateTotalWithInterest(totalAmount: number): number {
        const totalInterest = (totalAmount * this.interestRate) / 100;
        return totalAmount + totalInterest;
    }
}