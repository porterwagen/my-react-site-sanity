// utils/emailService.js
/**
 * SendGrid integration for sending emails from the contact form
 * 
 * Required setup:
 * 1. npm install @sendgrid/mail (already done)
 * 2. Add your SendGrid API key to .env.local as SENDGRID_API_KEY
 */

import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('SendGrid API key not found. Email functionality will not work properly.');
}

export async function sendViaEmailService(emailData) {
  const { subject, recipientEmail, fromEmail, fromName, data } = emailData;
  
  const msg = {
    to: recipientEmail,
    from: {
      email: fromEmail,
      name: fromName
    },
    subject: subject,
    text: `
      New contact form submission:
      
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      
      Message:
      ${data.message}
      
      Submitted on: ${data.submissionTime}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      
      <p><em>Submitted on: ${data.submissionTime}</em></p>
    `,
  };
  
  try {
    // Check if SendGrid is properly initialized
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SendGrid API key is missing - email will not be sent');
      return { 
        success: false, 
        error: 'Email service not configured',
        message: 'Contact form was received but email notification could not be sent'
      };
    }
    
    const response = await sgMail.send(msg);
    console.log('Email sent successfully via SendGrid');
    return { 
      success: true, 
      messageId: response[0]?.headers?.['x-message-id'] || 'unknown',
      response 
    };
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    // Return error object rather than throwing, so the form submission can still complete
    return { 
      success: false, 
      error: error.message || 'Unknown error sending email',
      details: error.response?.body || {}
    };
  }
}

/* 
// This was the placeholder function before implementing SendGrid
// It's now been replaced with the actual implementation above
export async function sendPlaceholderEmail(emailData) {
  console.log('Email would be sent via third party service:', emailData);
  return { 
    success: true, 
    message: 'This is a placeholder. Implement your preferred email service here.'
  };
}
*/
