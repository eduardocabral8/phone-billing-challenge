import { Call } from "./call";

export class User {
    private id: number;
    private name: string;
    private calls: Call[];

    constructor(id: number, name: string, calls: Call[]) {
        this.id = id;
        this.name = name;
        this.calls = calls;
    }
    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getCalls(): Call[] {
        return this.calls;
    }
}
