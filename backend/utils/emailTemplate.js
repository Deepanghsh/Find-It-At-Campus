const resetPasswordTemplate = (resetUrl, userName = 'Student') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; color: #374151; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #611bf8, #3c08aa); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; }
        .content p { font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4b5563; }
        .button-wrapper { text-align: center; margin: 35px 0; }
        .button { display: inline-block; background-color: #f59e0b; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3); }
        .footer { background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { color: #94a3b8; font-size: 13px; margin: 0; }
        .disclaimer { font-size: 13px; color: #94a3b8; text-align: center; margin-top: 20px; }
        .link { word-break: break-all; color: #611bf8; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>FindIt@Campus</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>We received a request to reset your password for your FindIt@Campus account. If you didn't make this request, you can safely ignore this email.</p>
          <p>To choose a new password and regain access to your account, please click the button below:</p>
          
          <div class="button-wrapper">
            <a href="${resetUrl}" class="button">Reset My Password</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p class="link">${resetUrl}</p>
          
          <p class="disclaimer">This link will expire in 10 minutes for your security.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} FindIt@Campus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { resetPasswordTemplate };
