import { Injectable } from '@nestjs/common';
import { SubscriptionPlanRepository } from '../../repositories/subscriptionPlanRepository';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly subscriptionPlanRepository:SubscriptionPlanRepository) {
  }
  // getSubscriptionByUser(userId:number)
}
