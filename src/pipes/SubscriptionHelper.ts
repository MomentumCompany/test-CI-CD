import {Periodicity, planType, SubscriptionPlanType} from "./enums";
import {PeriodicityCalculator} from "./PeriodicityCalculator";
import {SubscriptionPlan} from "../models/SubscriptionPlan";

export class SubscriptionHelper {
    private readonly date: Date;
    private subscriptionPlanType: planType;

    constructor(date, subscriptionPlanType) {
        this.date = date;
        this.subscriptionPlanType = subscriptionPlanType;
    }

    getSubscriptionPlanEndDate(): Date {
        switch (this.subscriptionPlanType) {
            case SubscriptionPlanType.trial:
                return PeriodicityCalculator.calculateTimePeriod(Periodicity.monthly, this.date);
            case SubscriptionPlanType.premium:
                return PeriodicityCalculator.calculateTimePeriod(Periodicity.annually, this.date);
            case SubscriptionPlanType.advanced:
                return PeriodicityCalculator.calculateTimePeriod(Periodicity.annually, this.date)
        }
    }

    selectSubscription(): SubscriptionPlan {
        const subscriptionPlan = new SubscriptionPlan();
        subscriptionPlan.startDate = this.date;
        subscriptionPlan.type = SubscriptionPlanType.trial;
        subscriptionPlan.endDate = this.getSubscriptionPlanEndDate();
        console.log(subscriptionPlan);
        return subscriptionPlan;

    }

}
