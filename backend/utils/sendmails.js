const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Using custom host from environment variable
        auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    // Use 'html' instead of 'text' for HTML email content
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333;">${options.subject}</h1>
          <p style="font-size: 16px; color: #555;">
            👍
          </p>
          ${
            options.resetUrl
              ? `<a href="${options.resetUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                  Reset Password
                </a>`
              : ''
          }
          <p style="margin-top: 30px; font-size: 14px; color: #777;">
            If you didn't request this, please ignore this email.
          </p>
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
