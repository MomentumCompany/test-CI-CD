import { Injectable } from '@nestjs/common';
import { APITokenRepository } from '../../repositories/APITokenRepository';
import { APITokens } from '../../models/API_Tokens';
import * as moment from 'moment';
import { SubscriptionHelper } from '../../pipes/SubscriptionHelper';
import { SubscriptionPlanType } from '../../pipes/enums';

@Injectable()
export class TokenService {
  constructor(private readonly tokenRepository: APITokenRepository) {
  }

  generateToken(userId: number, key: string): Promise<any> {
    const token = new APITokens();
    token.userId = userId;
    token.startDate = moment.utc().toDate();
    token.token = key;


    return this.tokenRepository.save(token);
  }
}
