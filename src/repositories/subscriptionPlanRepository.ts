import { EntityRepository, Repository } from 'typeorm';
import { SubscriptionPlan } from '../models/SubscriptionPlan';

@EntityRepository(SubscriptionPlan)
export class SubscriptionPlanRepository extends Repository<SubscriptionPlan> {
}
