import { Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from '../../services/payment/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {
  }

  @Post('createOrder/:userId')
  createOrder(@Body() body, @Param('userId') userId: number): Promise<any> {
    return this.paymentService.createOrder(userId,body.amount,body.receipt,body.notes);
  }
}
