import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { PaymentStatus } from '../pipes/enums';
import { User } from './user.entity';

@Entity()
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @Column()
  payeeId: number;

  @Column()
  paymentId: string;

}
