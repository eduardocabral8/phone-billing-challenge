import { LocalCall } from "../models/local-call";
import { NationalCall } from "../models/national-call";
import { InternationalCall } from "../models/international-call";
import { User } from "../models/user";

export class Billing {
    private basicSubscription: number;
    constructor(basicSubscription: number) {
        this.basicSubscription = basicSubscription;
    }
    public getBasicSubscription(): number {
        return this.basicSubscription;
    }
    public setBasicSubscription(subscription: number): void {
        this.basicSubscription = subscription;
    }
    public calculateCallCosts(user: User): { local: number; national: number; international: number } {
        const now = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        const callsLastMonth = user
            .getCalls()
            .filter((call) => call.getCallStart() >= oneMonthAgo);

        const callCosts = callsLastMonth.reduce(
            (acc, call) => {
                if (call instanceof LocalCall) {
                    acc.local += call.calculateCost();
                } else if (call instanceof NationalCall) {
                    acc.national += call.calculateCost();
                } else if (call instanceof InternationalCall) {
                    acc.international += call.calculateCost();
                }
                return acc;
            },
            { local: 0, national: 0, international: 0 },
        );
        return callCosts;
    }
    public calculateTotalCost(user: User): number {
        const callCosts = this.calculateCallCosts(user);
        return (
            this.basicSubscription +
            callCosts.local +
            callCosts.national +
            callCosts.international
        );
    }
}
