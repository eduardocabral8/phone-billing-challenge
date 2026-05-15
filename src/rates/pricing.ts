export class LocalPricing {
    public readonly PEAK_HOUR_START = 8;
    public readonly PEAK_HOUR_END = 20;

    private peakHourCost: number;
    private weekendCost: number;
    private offHoursCost: number;

    constructor(
        peakHourCost: number,
        weekendCost: number,
        offHoursCost: number,
    ) {
        this.peakHourCost = peakHourCost;
        this.weekendCost = weekendCost;
        this.offHoursCost = offHoursCost;
    }
    public getpeakHourCost(): number {
        return this.peakHourCost;
    }
    public getWeekendCost(): number {
        return this.weekendCost;
    }

    public getoffHoursCost(): number {
        return this.offHoursCost;
    }
    public setpeakHourCost(newCost: number): void {
        this.peakHourCost = newCost;
    }
    public setWeekendCost(newCost: number): void {
        this.weekendCost = newCost;
    }
    public setoffHoursCost(newCost: number): void {
        this.offHoursCost = newCost;
    }
}

export class NationalPricing {
    private costsByLocality: Record<string, number>;
    constructor(costsByLocality: Record<string, number>) {
        this.costsByLocality = costsByLocality;
    }
    public getCost(locality: string): number {
        if (!this.costsByLocality[locality]) {
            throw new Error(`No cost found for country: ${locality}`);
        }
        return this.costsByLocality[locality];
    }
    public setCost(locality: string, cost: number): void {
        this.costsByLocality[locality] = cost;
    }
    public deleteCost(locality: string): void {
        delete this.costsByLocality[locality];
    }
}

export class InternationalPricing {
    private costsByCountry: Record<string, number>;
    constructor(costsByCountry: Record<string, number>) {
        this.costsByCountry = costsByCountry;
    }
    public getCost(country: string): number {
        if (!this.costsByCountry[country]) {
            throw new Error(`No cost found for country: ${country}`);
        }
        return this.costsByCountry[country];
    }
    public setCost(locality: string, cost: number): void {
        this.costsByCountry[locality] = cost;
    }
    public deleteCost(locality: string): void {
        delete this.costsByCountry[locality];
    }
}
