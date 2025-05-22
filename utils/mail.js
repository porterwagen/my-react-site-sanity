// utils/mail.js
/**
 * This module contains email functionality for the contact form.
 * It uses a third-party service for sending emails.
 * You'll need to configure your preferred service (like SendGrid, Mailchimp, etc.)
 */

import { sendViaEmailService } from './emailService';

/**
 * Send notification email about a new contact form submission using a third-party service
 * @param {Object} submissionData - The form data submitted by the user
 * @returns {Promise} - The result of the email sending operation
 */
export async function sendContactEmail(submissionData) {
  const { name, email, phone, message } = submissionData;
  
  // Format the message content (can be used with various services)
  const emailContent = {
    subject: `New Contact Form Submission from ${name}`,
    recipientEmail: process.env.EMAIL_TO || 'daniel.edward.porter@gmail.com',
    recipientName: 'Daniel Porter',
    fromEmail: process.env.EMAIL_FROM || 'noreply@porterwagen.com',
    fromName: 'Website Contact Form',
    replyTo: email,
    
    // Data for the email body
    data: {
      name,
      email,
      phone: phone || 'Not provided',
      message,
      submissionTime: new Date().toLocaleString()
    }
  };

  try {
    // Use the email service to send the message
    const result = await sendViaEmailService(emailContent);
    return result;
  } catch (error) {
    console.error('Error sending email via third-party service:', error);
    // Don't throw the error, so form submission can still proceed
    return { 
      success: false, 
      error: 'Email sending failed, but form submission was processed',
      details: error.message || 'Unknown error'
    };
  }
}
