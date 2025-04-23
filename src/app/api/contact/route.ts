import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER || 'mail.aiconic@gmail.com', // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'mail.aiconic@gmail.com',
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <h3 style="color: #555; margin-top: 20px;">Message:</h3>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    <p style="white-space: pre-line;">${message}</p>
  </div>
  <p style="color: #888; margin-top: 30px; font-size: 12px;">
    This email was sent from the contact form on your website.
  </p>
</div>
      `,
    };

    try {
      // Check if email password is configured
      if (!process.env.EMAIL_PASSWORD) {
        console.log('Email would be sent to: mail.aiconic@gmail.com');
        console.log('From:', name, email);
        console.log('Subject:', subject);
        console.log('Message:', message);
        
        // For development without actual email credentials
        return NextResponse.json(
          { success: true, message: 'Form submitted successfully (email sending simulated)' },
          { status: 200 }
        );
      }
      
      // Send email
      await transporter.sendMail(mailOptions);
      
      // Return success response
      return NextResponse.json(
        { success: true, message: 'Form submitted successfully' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}