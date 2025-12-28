import Razorpay from 'razorpay';
import crypto from 'crypto';

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id_here',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_key_secret_here',
});

export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export class PaymentService {
  /**
   * Create a Razorpay order
   */
  static async createOrder(amount: number, receipt: string): Promise<PaymentOrder> {
    try {
      const options = {
        amount: amount * 100, // Convert to paise (Razorpay expects amount in smallest currency unit)
        currency: 'INR',
        receipt: receipt,
        payment_capture: 1, // Auto capture payment
      };

      const order = await razorpay.orders.create(options);
      
      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  /**
   * Verify payment signature
   */
  static verifyPayment(verification: PaymentVerification): boolean {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verification;
      
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_razorpay_key_secret_here')
        .update(body.toString())
        .digest('hex');

      return expectedSignature === razorpay_signature;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  /**
   * Get payment details
   */
  static async getPaymentDetails(paymentId: string) {
    try {
      return await razorpay.payments.fetch(paymentId);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw new Error('Failed to fetch payment details');
    }
  }

  /**
   * Refund payment
   */
  static async refundPayment(paymentId: string, amount?: number) {
    try {
      const refundOptions: any = {
        payment_id: paymentId,
      };
      
      if (amount) {
        refundOptions.amount = amount * 100; // Convert to paise
      }

      return await razorpay.payments.refund(paymentId, refundOptions);
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }
}
