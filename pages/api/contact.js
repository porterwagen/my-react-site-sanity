import { sendContactEmail } from '../../utils/mail';
import { saveSubmission } from '../../utils/formPersistence';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract form data from request body
    const { name, email, phone, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Add submission timestamp
    const submissionData = {
      name,
      email,
      phone,
      message,
      submission_time: new Date().toISOString(),
      form_id: 'contact_form',
      referrer: req.headers.referer || null,
      userAgent: req.headers['user-agent'] || null
    };
    
    // Log the submission
    console.log('Form submission:', submissionData);
    
    // Persist the submission data locally
    try {
      const saveResult = await saveSubmission(submissionData);
      if (saveResult.success) {
        console.log(`Form submission saved with ID: ${saveResult.id}`);
        // Add the ID to the submission data for email notifications
        submissionData.id = saveResult.id;
      } else {
        console.error('Failed to save submission locally:', saveResult.error);
      }
    } catch (saveError) {
      console.error('Error saving submission:', saveError);
      // Continue processing even if local save fails
    }
    
    // Send email notification
    let emailResult = { success: false };
    try {
      emailResult = await sendContactEmail(submissionData);
      if (emailResult.success) {
        console.log('Email notification sent successfully:', emailResult.messageId);
      } else {
        console.warn('Email notification not sent (but form processed):', emailResult.error);
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue processing even if email fails - we don't want to block the form submission
    }
    
    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your submission!',
      data: submissionData
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Server error', 
      message: 'There was an error processing your submission.'
    });
  }
}
