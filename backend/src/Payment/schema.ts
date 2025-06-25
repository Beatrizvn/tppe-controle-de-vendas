export abstract class Payment {
    status: string;
    date: string; 

    constructor(date: string) {
        this.status = "Pending";
        this.date = date;
    }

    public validatePayment(): boolean {
        console.log("Validating payment...");
        this.status = "Approved";
        return true;
    }
}