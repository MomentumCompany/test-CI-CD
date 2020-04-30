import { BaseEntity } from './BaseEntity';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionPlanType } from '../pipes/enums';
import { DateUtils } from 'typeorm/util/DateUtils';
import { User } from './user.entity';

@Entity()
export class SubscriptionPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SubscriptionPlanType, default: SubscriptionPlanType.trial })
  type: SubscriptionPlanType;

  @CreateDateColumn()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToOne(type => User, user => user.subscriptionPlan)
  user: User;

}
