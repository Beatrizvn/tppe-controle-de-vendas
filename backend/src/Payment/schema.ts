export abstract class Payment {
    status: string;
    date: string; 

    constructor(date: string) {
        this.status = "Pending";
        this.date = date;
    }

    public validatePayment(): boolean {
        this.status = "Approved";
        return true;
    }
}