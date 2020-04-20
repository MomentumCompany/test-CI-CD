import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionPlanService } from '../../services/subscription-plan/subscription-plan.service';

@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(private  readonly subscriptionPlsanService:SubscriptionPlanService) {
  }
  @Get(':userId')
  getUserSubscription(@Param('userId') userId: string): Promise<any> {
return;
  }
}
