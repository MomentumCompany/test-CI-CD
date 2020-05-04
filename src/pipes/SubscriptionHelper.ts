import { Periodicity, planType, SubscriptionPlanType } from './enums';
import { PeriodicityCalculator } from './PeriodicityCalculator';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { User } from '../models/user.entity';

export class SubscriptionHelper {
  private readonly date: Date;
  private subscriptionPlanType: planType;

  constructor(date: Date, subscriptionPlanType: SubscriptionPlanType) {
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
        return PeriodicityCalculator.calculateTimePeriod(Periodicity.annually, this.date);
      default:
        return PeriodicityCalculator.calculateTimePeriod(Periodicity.monthly, this.date);
    }
  }

  selectSubscription(userId: number): SubscriptionPlan {
    const subscriptionPlan = new SubscriptionPlan();
    subscriptionPlan.startDate = this.date;
    subscriptionPlan.type = SubscriptionPlanType.trial;
    subscriptionPlan.endDate = this.getSubscriptionPlanEndDate();
    // user.subscriptionPlan = subscriptionPlan;
    subscriptionPlan.userId = userId;
    // console.log(subscriptionPlan);
    return subscriptionPlan;

  }

}
