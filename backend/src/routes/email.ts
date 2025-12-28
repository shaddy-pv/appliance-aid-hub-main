import { Router } from 'express';
import { z } from 'zod';
import { EmailService } from '../services/email';
import { Order, Booking, User } from '../models';

export const emailRouter = Router();

// Validation schemas
const sendOrderEmailSchema = z.object({
  orderId: z.string(),
});

const sendBookingEmailSchema = z.object({
  bookingId: z.string(),
});

const sendPasswordResetSchema = z.object({
  email: z.string().email(),
});

/**
 * Send order confirmation email
 * POST /api/email/order-confirmation
 */
emailRouter.post('/order-confirmation', async (req, res) => {
  try {
    const parsed = sendOrderEmailSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Invalid input data', 
        details: parsed.error.flatten() 
      });
    }

    const { orderId } = parsed.data;

    // Get order details from database
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ 
        error: 'Order not found' 
      });
    }

    // Parse items from JSON
    const items = JSON.parse(order.itemsJson);

    // Prepare email data
    const emailData = {
      orderId: order._id.toString(),
      customerName: order.customerFullName,
      customerEmail: order.customerEmail,
      items: items.map((item: any) => ({
        name: item.name || item.title,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
      total: order.subtotal,
      paymentMethod: order.paymentMethod,
      address: `${order.addressLine1}, ${order.addressLine2 || ''}, ${order.city}, ${order.state} ${order.postalCode}`,
      orderDate: order.createdAt.toLocaleDateString(),
    };

    // Send email
    await EmailService.sendOrderConfirmation(emailData);

    res.json({
      success: true,
      message: 'Order confirmation email sent successfully'
    });

  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    res.status(500).json({ 
      error: 'Failed to send order confirmation email',
      message: 'Please try again later'
    });
  }
});

/**
 * Send booking confirmation email
 * POST /api/email/booking-confirmation
 */
emailRouter.post('/booking-confirmation', async (req, res) => {
  try {
    const parsed = sendBookingEmailSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Invalid input data', 
        details: parsed.error.flatten() 
      });
    }

    const { bookingId } = parsed.data;

    // Get booking details from database
    const booking = await Booking.findById(bookingId).populate('serviceId');

    if (!booking) {
      return res.status(404).json({ 
        error: 'Booking not found' 
      });
    }

    const service = booking.serviceId as any;

    // Prepare email data
    const emailData = {
      bookingId: booking._id.toString(),
      customerName: booking.customerFullName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      serviceName: service.title,
      serviceDate: booking.preferredDate,
      serviceTime: booking.preferredTimeSlot,
      address: `${booking.addressLine1}, ${booking.addressLine2 || ''}, ${booking.city}, ${booking.state} ${booking.postalCode}`,
      notes: booking.notes || undefined,
    };

    // Send email
    await EmailService.sendBookingConfirmation(emailData);

    res.json({
      success: true,
      message: 'Booking confirmation email sent successfully'
    });

  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    res.status(500).json({ 
      error: 'Failed to send booking confirmation email',
      message: 'Please try again later'
    });
  }
});

/**
 * Send password reset email
 * POST /api/email/password-reset
 */
emailRouter.post('/password-reset', async (req, res) => {
  try {
    const parsed = sendPasswordResetSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Invalid input data', 
        details: parsed.error.flatten() 
      });
    }

    const { email } = parsed.data;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
    }

    // Generate reset token (in a real app, you'd store this in database with expiry)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Send email
    await EmailService.sendPasswordReset(email, resetToken);

    res.json({
      success: true,
      message: 'Password reset email sent successfully'
    });

  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ 
      error: 'Failed to send password reset email',
      message: 'Please try again later'
    });
  }
});

/**
 * Test email configuration
 * GET /api/email/test
 */
emailRouter.get('/test', async (req, res) => {
  try {
    const success = await EmailService.testConnection();
    
    if (success) {
      res.json({
        success: true,
        message: 'Email configuration is working correctly'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Email configuration test failed'
      });
    }
  } catch (error) {
    console.error('Error testing email configuration:', error);
    res.status(500).json({ 
      error: 'Failed to test email configuration',
      message: 'Please check your email settings'
    });
  }
});
