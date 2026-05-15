    import { Call } from "./call";

    export class LocalCall extends Call {
        private peakHourStart: number;
        private peakHourEnd: number;
        private peakHourCost: number;
        private offHoursCost: number;
        private weekendCost: number;

        constructor(
            id: number, callStart: Date, callEnd: Date,
            peakHourStart: number, peakHourEnd: number,
            peakHourCost: number, offHoursCost: number, weekendCost: number
        ) {
            super(id, callStart, callEnd);
            this.peakHourStart = peakHourStart;
            this.peakHourEnd = peakHourEnd;
            this.peakHourCost = peakHourCost;
            this.offHoursCost = offHoursCost;
            this.weekendCost = weekendCost;
        }

        public override calculateCost(): number {
            let callCost = 0;
            if (this.callStart.getDay() !== 0 && this.callStart.getDay() !== 6) {
                const startMinutes = this.callStart.getHours() * 60 + this.callStart.getMinutes();
                const endMinutes = this.callEnd.getHours() * 60 + this.callEnd.getMinutes();
                const businessDayMinutes =
                    Math.min(endMinutes, this.peakHourEnd * 60) -
                    Math.max(startMinutes, this.peakHourStart * 60);
                const offHoursMinutes = this.getCallDuration() - Math.max(0, businessDayMinutes);
                if (businessDayMinutes > 0) {
                    callCost = businessDayMinutes * this.peakHourCost + offHoursMinutes * this.offHoursCost;
                } else {
                    callCost = offHoursMinutes * this.offHoursCost;
                }
            } else {
                callCost = this.getCallDuration() * this.weekendCost;
            }
            return callCost;
        }
    }