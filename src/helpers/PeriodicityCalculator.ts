import {Periodicity} from "../entity/enums";

export class PeriodicityCalculator {
    static calculateTimePeriod(periocicity: Periodicity, startDate: Date): Date {
        switch (periocicity) {
            case Periodicity.monthly:
                return this.dateTimeCalculator(startDate, 1);
            case Periodicity.quarter:
                return this.dateTimeCalculator(startDate, 3);
            case Periodicity.annually:
                return this.dateTimeCalculator(startDate, 12);
            case Periodicity.halfYearly:
                return this.dateTimeCalculator(startDate, 6)
        }
    }

    static dateTimeCalculator(date: Date, timePeriod: number) {
        const dt = new Date(date);
        const targetMonth = dt.getMonth() + timePeriod;
        dt.setMonth(targetMonth);
        if (dt.getMonth() !== targetMonth % 12) {
            dt.setDate(0); // last day of previous month
        }
        return dt;
    }
}
