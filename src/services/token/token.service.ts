import { Injectable } from '@nestjs/common';
import { APITokenRepository } from '../../repositories/APITokenRepository';
import { APITokens } from '../../models/API_Tokens';
import * as moment from 'moment';
import { SubscriptionPlanService } from '../subscription-plan/subscription-plan.service';
import { SubscriptionPlan } from '../../models/SubscriptionPlan';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: APITokenRepository, private readonly subscriptionService:SubscriptionPlanService) {
  }

 async generateToken(userId: number, key: string): Promise<any> {
    const token = new APITokens();
    token.userId = userId;
    token.startDate = moment.utc().toDate();
    token.token = key;
    const responseObj = await this.subscriptionService.getSubscriptionByUser(userId);
    const subscriptionOfUser :SubscriptionPlan = responseObj[0].subscriptionPlan;
    token.expiryDate = subscriptionOfUser.endDate;
    return this.tokenRepository.save(token);
  }
}
