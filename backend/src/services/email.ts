import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  address: string;
  orderDate: string;
}

export interface BookingEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  serviceDate: string;
  serviceTime: string;
  address: string;
  notes?: string;
}

export class EmailService {
  /**
   * Send email with template
   */
  static async sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string
  ): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"Appliance Aid Hub" <${emailConfig.auth.user}>`,
        to,
        subject,
        html,
        text: text || this.htmlToText(html),
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  /**
   * Send order confirmation email
   */
  static async sendOrderConfirmation(data: OrderEmailData): Promise<boolean> {
    const template = this.getOrderConfirmationTemplate();
    const html = template(data);
    
    return await this.sendEmail(
      data.customerEmail,
      `Order Confirmation - ${data.orderId}`,
      html
    );
  }

  /**
   * Send booking confirmation email
   */
  static async sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
    const template = this.getBookingConfirmationTemplate();
    const html = template(data);
    
    return await this.sendEmail(
      data.customerEmail,
      `Service Booking Confirmed - ${data.bookingId}`,
      html
    );
  }

  /**
   * Send booking reminder email
   */
  static async sendBookingReminder(data: BookingEmailData): Promise<boolean> {
    const template = this.getBookingReminderTemplate();
    const html = template(data);
    
    return await this.sendEmail(
      data.customerEmail,
      `Service Reminder - ${data.serviceName}`,
      html
    );
  }

  /**
   * Send service completion email
   */
  static async sendServiceCompletion(data: BookingEmailData): Promise<boolean> {
    const template = this.getServiceCompletionTemplate();
    const html = template(data);
    
    return await this.sendEmail(
      data.customerEmail,
      `Service Completed - ${data.serviceName}`,
      html
    );
  }

  /**
   * Send password reset email
   */
  static async sendPasswordReset(email: string, resetToken: string): Promise<boolean> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:8080'}/reset-password?token=${resetToken}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>You requested a password reset for your Appliance Aid Hub account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
      </div>
    `;
    
    return await this.sendEmail(email, 'Password Reset Request', html);
  }

  /**
   * Get order confirmation template
   */
  private static getOrderConfirmationTemplate(): HandlebarsTemplateDelegate {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">Order Confirmation</h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #374151;">Order Details</h3>
            <p><strong>Order ID:</strong> {{orderId}}</p>
            <p><strong>Date:</strong> {{orderDate}}</p>
            <p><strong>Payment Method:</strong> {{paymentMethod}}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151;">Items Ordered</h3>
            {{#each items}}
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <span>{{name}} (Qty: {{quantity}})</span>
              <span>₹{{price}}</span>
            </div>
            {{/each}}
            <div style="display: flex; justify-content: space-between; padding: 15px 0; font-weight: bold; font-size: 18px; border-top: 2px solid #2563eb;">
              <span>Total</span>
              <span>₹{{total}}</span>
            </div>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #374151;">Delivery Address</h3>
            <p>{{address}}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280;">Thank you for choosing Appliance Aid Hub!</p>
            <p style="color: #6b7280;">We'll process your order and send you updates.</p>
          </div>
        </div>
      </div>
    `;
    
    return Handlebars.compile(template);
  }

  /**
   * Get booking confirmation template
   */
  private static getBookingConfirmationTemplate(): HandlebarsTemplateDelegate {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">Service Booking Confirmed</h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #374151;">Booking Details</h3>
            <p><strong>Booking ID:</strong> {{bookingId}}</p>
            <p><strong>Service:</strong> {{serviceName}}</p>
            <p><strong>Date:</strong> {{serviceDate}}</p>
            <p><strong>Time:</strong> {{serviceTime}}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #374151;">Customer Information</h3>
            <p><strong>Name:</strong> {{customerName}}</p>
            <p><strong>Email:</strong> {{customerEmail}}</p>
            <p><strong>Phone:</strong> {{customerPhone}}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #374151;">Service Address</h3>
            <p>{{address}}</p>
            {{#if notes}}
            <p><strong>Notes:</strong> {{notes}}</p>
            {{/if}}
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280;">Our technician will contact you before the scheduled time.</p>
            <p style="color: #6b7280;">Thank you for choosing Appliance Aid Hub!</p>
          </div>
        </div>
      </div>
    `;
    
    return Handlebars.compile(template);
  }

  /**
   * Get booking reminder template
   */
  private static getBookingReminderTemplate(): HandlebarsTemplateDelegate {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; text-align: center; margin-bottom: 30px;">Service Reminder</h1>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
            <h3 style="margin-top: 0; color: #92400e;">Upcoming Service Appointment</h3>
            <p><strong>Service:</strong> {{serviceName}}</p>
            <p><strong>Date:</strong> {{serviceDate}}</p>
            <p><strong>Time:</strong> {{serviceTime}}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #374151;">Service Address</h3>
            <p>{{address}}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280;">Please ensure someone is available at the service address.</p>
            <p style="color: #6b7280;">Our technician will contact you before arrival.</p>
          </div>
        </div>
      </div>
    `;
    
    return Handlebars.compile(template);
  }

  /**
   * Get service completion template
   */
  private static getServiceCompletionTemplate(): HandlebarsTemplateDelegate {
    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #10b981; text-align: center; margin-bottom: 30px;">Service Completed</h1>
          
          <div style="background-color: #d1fae5; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #10b981;">
            <h3 style="margin-top: 0; color: #065f46;">Service Details</h3>
            <p><strong>Service:</strong> {{serviceName}}</p>
            <p><strong>Completed On:</strong> {{serviceDate}}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280;">Thank you for choosing Appliance Aid Hub!</p>
            <p style="color: #6b7280;">We hope you're satisfied with our service.</p>
            <p style="color: #6b7280;">Please rate your experience and leave a review.</p>
          </div>
        </div>
      </div>
    `;
    
    return Handlebars.compile(template);
  }

  /**
   * Convert HTML to plain text
   */
  private static htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Test email configuration
   */
  static async testConnection(): Promise<boolean> {
    try {
      await transporter.verify();
      console.log('Email server connection verified');
      return true;
    } catch (error) {
      console.error('Email server connection failed:', error);
      return false;
    }
  }
}
