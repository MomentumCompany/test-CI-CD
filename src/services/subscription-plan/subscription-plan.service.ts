import { Injectable } from '@nestjs/common';
import { SubscriptionPlanRepository } from '../../repositories/subscriptionPlanRepository';
import { UserRepositoy } from '../../repositories/userRepositoy';
import { User } from '../../models/user.entity';

@Injectable()
export class SubscriptionPlanService {
  constructor(private readonly subscriptionPlanRepository: SubscriptionPlanRepository, private readonly userRepositoy: UserRepositoy) {
  }

  getSubscriptionByUser(userId: number): Promise<any> {
    return this.userRepositoy.find({
      relations: ['subscriptionPlan'],
      where: { id: userId },
      select: ['subscriptionPlan', 'Name', 'email', 'role'],
    });
  }
}
