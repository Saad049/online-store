// utils/sendEmail.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Order } from '../entities/order';
dotenv.config();

export const sendOrderConfirmationEmail = async (to: string, order: Order) => {
  const orderItemsList = (order.items || []).map(
    (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.product.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
      </tr>`
  ).join('');

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <div style="background-color:rgb(255, 0, 162); padding: 20px; color: white;">
        <h2 style="margin: 0;">Order Confirmation - #${order.id}</h2>
        <p style="margin: 5px 0;">Thank you for shopping with us, <strong>${order.user.name}</strong>!</p>
      </div>

      <div style="padding: 20px;">
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="padding: 10px; background: #f2f2f2; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; background: #f2f2f2; border: 1px solid #ddd;">Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsList}
          </tbody>
        </table>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Charges</h3>
        <p><strong>Subtotal:</strong> Rs.${order.total}</p>
        <p><strong>Tax:</strong> Rs.${order.tax}</p>
        <p><strong>Delivery Fee:</strong> Rs.${order.deliveryFee}</p>
        <p><strong>Service Fee:</strong> Rs.${order.serviceFee}</p>
        <p style="font-size: 18px;"><strong>Total:</strong> Rs.${order.totalPrice}</p>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Delivery Details</h3>
        <p><strong>Address:</strong> ${order.deliveryAddress}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>

      <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        Need help? Contact our support anytime.
        <br>
        &copy; ${new Date().getFullYear()} RouteEase. All rights reserved.
      </div>
    </div>
  </div>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order #${order.id} Confirmation`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
export const sendOrderShippedEmail = async (to: string, order: Order) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color:rgb(255, 0, 162); padding: 20px; color: white;">
          <h2 style="margin: 0;">Order Shipped - #${order.id}</h2>
          <p style="margin: 5px 0;">Hi <strong>${order.user.name}</strong>, your order has been shipped!</p>
        </div>

        <div style="padding: 20px;">
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Tracking Information</h3>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
        </div>

        <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          For tracking updates, visit your account.
          <br>
          &copy; ${new Date().getFullYear()} RouteEase. All rights reserved.
        </div>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order #${order.id} Shipped`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
export const sendOrderDeliveredEmail = async (to: string, order: Order) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color:rgb(255, 0, 162); padding: 20px; color: white;">
          <h2 style="margin: 0;">Order delivered - #${order.id}</h2>
          <p style="margin: 5px 0;">Hi <strong>${order.user.name}</strong>, your order has been delivered!</p>
        </div>

        <div style="padding: 20px;">
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Tracking Information</h3>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
        </div>

        <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          For tracking updates, visit your account.
          <br>
          &copy; ${new Date().getFullYear()} RouteEase. All rights reserved.
        </div>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order #${order.id} Delivered`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOrderCancelledEmail = async (to: string, order: Order) => {
  const htmlContent = `
   <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color:rgb(255, 0, 162); padding: 20px; color: white;">
          <h2 style="margin: 0;">Order cancelled - #${order.id}</h2>
          <p style="margin: 5px 0;">Hi <strong>${order.user.name}</strong>, your order has been cancelled!</p>
        </div>

        <div style="padding: 20px;">
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Tracking Information</h3>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
           <p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
             <p>If this was a mistake, please contact support.</p>
        </div>

        <div style="background-color: #f2f2f2; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          For tracking updates, visit your account.
          <br>
          &copy; ${new Date().getFullYear()} RouteEase. All rights reserved.
        </div>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order #${order.id} Cancelled`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

