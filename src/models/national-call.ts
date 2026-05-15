import { Call } from "./call";
import { NationalPricing } from "../rates/pricing";

export class NationalCall extends Call {
    private locality: string;
    private pricing: NationalPricing;
    constructor(
        id: number,
        callStart: Date,
        callEnd: Date,
        locality: string,
        pricing: NationalPricing,
    ) {
        super(id, callStart, callEnd);
        this.locality = locality;
        this.pricing = pricing;
    }
    public getLocality(): string {
        return this.locality;
    }
    public override calculateCost(): number {
        const callCost =
            this.pricing.getCost(this.locality) * this.getCallDuration();
        return callCost;
    }
}
