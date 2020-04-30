import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UsersService } from '../services/user/user.service';
import { UserController } from './user/user.controller';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { UserRepositoy } from '../repositories/userRepositoy';
import { SubscriptionPlanController } from './subscription-plan/subscription-plan.controller';
import { SubscriptionPlanService } from '../services/subscription-plan/subscription-plan.service';
import { TokenController } from './token/token.controller';
import { APITokenRepository } from '../repositories/APITokenRepository';
import { TokenService } from '../services/token/token.service';
import { APITokens } from '../models/API_Tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositoy, User, SubscriptionPlan,APITokens, APITokenRepository])],
  controllers: [UserController, SubscriptionPlanController, TokenController],
  providers: [UsersService, SubscriptionPlanService,TokenService],
})
export class UserModule {
}
