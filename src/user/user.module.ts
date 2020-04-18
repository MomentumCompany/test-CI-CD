import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UsersService } from '../services/user.service';
import { UserController } from './user.controller';
import { SubscriptionPlan } from '../models/SubscriptionPlan';
import { UserRepositoy } from '../repositories/userRepositoy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositoy, User, SubscriptionPlan])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {
}
