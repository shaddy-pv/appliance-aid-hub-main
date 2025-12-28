import { Router } from 'express';
import { z } from 'zod';
import { PaymentService } from '../services/payment';
import { Order } from '../models';

export const paymentRouter = Router();

// Validation schemas
const createOrderSchema = z.object({
  amount: z.number().positive(),
  receipt: z.string().min(1),
  orderId: z.string().optional(), // Our internal order ID
});

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  orderId: z.string().optional(), // Our internal order ID
});

/**
 * Create Razorpay order
 * POST /api/payment/create-order
 */
paymentRouter.post('/create-order', async (req, res) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Invalid input data', 
        details: parsed.error.flatten() 
      });
    }

    const { amount, receipt, orderId } = parsed.data;

    // Create Razorpay order
    const razorpayOrder = await PaymentService.createOrder(amount, receipt);

    // If we have an internal order ID, update the order with Razorpay order ID
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        paymentMethod: 'card',
        // Store Razorpay order ID in a custom field if needed
      });
    }

    res.json({
      success: true,
      order: razorpayOrder,
      message: 'Payment order created successfully'
    });

  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ 
      error: 'Failed to create payment order',
      message: 'Please try again later'
    });
  }
});

/**
 * Verify payment
 * POST /api/payment/verify
 */
paymentRouter.post('/verify', async (req, res) => {
  try {
    const parsed = verifyPaymentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Invalid input data', 
        details: parsed.error.flatten() 
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = parsed.data;

    // Verify payment signature
    const isVerified = PaymentService.verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isVerified) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed',
        message: 'Invalid payment signature'
      });
    }

    // Update order status if we have an internal order ID
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        status: 'confirmed',
        // Store payment details if needed
      });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Failed to verify payment',
      message: 'Please try again later'
    });
  }
});

/**
 * Get payment details
 * GET /api/payment/details/:paymentId
 */
paymentRouter.get('/details/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const paymentDetails = await PaymentService.getPaymentDetails(paymentId);

    res.json({
      success: true,
      payment: paymentDetails
    });

  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch payment details',
      message: 'Please try again later'
    });
  }
});

/**
 * Process refund
 * POST /api/payment/refund
 */
paymentRouter.post('/refund', async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    if (!paymentId) {
      return res.status(400).json({ 
        error: 'Payment ID is required' 
      });
    }

    const refund = await PaymentService.refundPayment(paymentId, amount);

    res.json({
      success: true,
      refund,
      message: 'Refund processed successfully'
    });

  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ 
      error: 'Failed to process refund',
      message: 'Please try again later'
    });
  }
});
