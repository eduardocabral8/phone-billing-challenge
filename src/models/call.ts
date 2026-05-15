export abstract class Call {
    private id: number;
    protected callStart: Date;
    protected callEnd: Date;
    constructor(id: number, callStart: Date, callEnd: Date) {
        this.id = id;
        this.callStart = callStart;
        this.callEnd = callEnd;
    }
    public getId(): number {
        return this.id;
    }
    public getCallStart(): Date {
        return this.callStart;
    }
    public getCallEnd(): Date {
        return this.callEnd;
    }
    public getCallDuration(): number {
        const callDurationMs = this.callEnd.valueOf() - this.callStart.valueOf();
        return Math.ceil(callDurationMs / 60000);
    }
    public abstract calculateCost(): number;
}