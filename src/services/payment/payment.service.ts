import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transactionRepository';
import { RazorPay } from '../../shared-models/razor-pay';
import { TransactionEntity } from '../../models/transaction.entity';
import { PaymentStatus } from '../../pipes/enums';

@Injectable()
export class PaymentService {
  constructor(private readonly transactionRepository: TransactionRepository) {
  }

  async createOrder(userId: number, amount: number, receipt?: string, notes?: any): Promise<any> {
    const razorPay = new RazorPay();
    if (!receipt) {
      receipt = `Receipt for amount: ${amount} payee Id: ${userId}`;
    }
    const notesJson = {};
    notesJson['payee info'] = `Note: Online payment attempt is done by ${userId} for amount: ${amount}`;
    notesJson['other-info'] = notes || `No other info`;

    const order = await razorPay.createOrder(amount, receipt, notesJson);
    console.log(order);

    const transaction = new TransactionEntity();
    transaction.orderId = order.id;
    transaction.status = PaymentStatus.pending;
    transaction.payeeId = userId;
    transaction.paymentId = 'order created';

    return this.transactionRepository.save(transaction);
  }
}
