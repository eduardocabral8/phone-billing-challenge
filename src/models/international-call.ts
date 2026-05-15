import { Call } from "./call";
import { InternationalPricing } from "../rates/pricing";

export class InternationalCall extends Call {
    private country: string;
    private pricing: InternationalPricing;
    constructor(
        id: number,
        callStart: Date,
        callEnd: Date,
        country: string,
        pricing: InternationalPricing,
    ) {
        super(id, callStart, callEnd);
        this.country = country;
        this.pricing = pricing;
    }
    public getCountry(): string {
        return this.country;
    }
    public override calculateCost(): number {
        const callCost =
            this.pricing.getCost(this.country) * this.getCallDuration();
        return callCost;
    }
}
