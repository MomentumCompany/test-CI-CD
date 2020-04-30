import { environment } from '../environment';
import * as razorpay from 'razorpay';

export class RazorPay {
  private razorKey: string;
  private razorSecret: string;
  private razorInstance: any;
  private currency: string = 'INR';
  private paymentCaptured: number = 1;

  constructor() {
    this.razorKey = process.env.razor_key || environment.razorKeyId;
    this.razorSecret = process.env.razor_secret || environment.razorSecretKey;
    this.init();
  }

  init() {
    this.razorInstance = new razorpay({
      key_id: this.razorKey,
      key_secret: this.razorSecret,
    });
  }

  createOrder(amount: number, receipt: string, notes: any): Promise<any> {
    return this.razorInstance.orders.create({
      amount: amount,
      currency: this.currency,
      receipt: receipt,
      payment_capture: this.paymentCaptured,
      notes: notes,
    });
  }
}
