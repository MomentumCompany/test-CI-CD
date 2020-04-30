import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from '../services/payment/payment.service';
import { TransactionRepository } from '../repositories/transactionRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../models/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, TransactionRepository])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {
}
