// Email service for frontend
import { api } from './api';

export interface EmailService {
  sendOrderConfirmation: (orderId: string) => Promise<boolean>;
  sendBookingConfirmation: (bookingId: string) => Promise<boolean>;
  sendBookingReminder: (bookingId: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<boolean>;
  testEmailConfig: () => Promise<boolean>;
}

class EmailServiceImpl implements EmailService {
  /**
   * Send order confirmation email
   */
  async sendOrderConfirmation(orderId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send order confirmation email');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      return false;
    }
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(bookingId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/email/booking-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send booking confirmation email');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error sending booking confirmation email:', error);
      return false;
    }
  }

  /**
   * Send booking reminder email
   */
  async sendBookingReminder(bookingId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/email/booking-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send booking reminder email');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error sending booking reminder email:', error);
      return false;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordReset(email: string): Promise<boolean> {
    try {
      const response = await fetch('/api/email/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send password reset email');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }

  /**
   * Test email configuration
   */
  async testEmailConfig(): Promise<boolean> {
    try {
      const response = await fetch('/api/email/test', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to test email configuration');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error testing email configuration:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailServiceImpl();
