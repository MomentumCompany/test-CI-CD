import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UsersService } from '../services/user/user.service';
import { UserController } from './user/user.controller';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { UserRepositoy } from '../repositories/userRepositoy';
import { SubscriptionPlanController } from './subscription-plan/subscription-plan.controller';
import { SubscriptionPlanService } from '../services/subscription-plan/subscription-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositoy, User, SubscriptionPlan])],
  controllers: [UserController, SubscriptionPlanController],
  providers: [UsersService, SubscriptionPlanService],
})
export class UserModule {
}
