// Razorpay payment integration for frontend
import Razorpay from 'razorpay';
import { config } from './config';

export interface PaymentOptions {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export class PaymentService {
  /**
   * Initialize Razorpay payment
   */
  static async initializePayment(options: PaymentOptions) {
    try {
      // Create Razorpay order on backend
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: options.amount,
          receipt: `receipt_${options.orderId}_${Date.now()}`,
          orderId: options.orderId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const { order } = await response.json();

      // Initialize Razorpay
      const razorpay = new Razorpay({
        key: config.razorpay.keyId,
        amount: order.amount,
        currency: config.razorpay.currency,
        name: config.razorpay.name,
        description: config.razorpay.description,
        image: config.razorpay.image,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: options.orderId,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              options.onSuccess(response.razorpay_payment_id);
            } else {
              options.onError('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            options.onError('Payment verification failed');
          }
        },
        prefill: {
          name: options.customerName,
          email: options.customerEmail,
          contact: options.customerPhone,
        },
        notes: {
          orderId: options.orderId,
        },
        theme: config.razorpay.theme,
        modal: {
          ondismiss: () => {
            options.onError('Payment cancelled by user');
          },
        },
      });

      // Open Razorpay modal
      razorpay.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      options.onError('Failed to initialize payment');
    }
  }

  /**
   * Check if Razorpay is available
   */
  static isRazorpayAvailable(): boolean {
    return typeof window !== 'undefined' && window.Razorpay !== undefined;
  }

  /**
   * Load Razorpay script dynamically
   */
  static loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window object not available'));
        return;
      }

      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.head.appendChild(script);
    });
  }
}

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}
