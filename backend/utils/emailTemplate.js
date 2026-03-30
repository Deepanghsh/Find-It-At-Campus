const verifyOtpTemplate = (otp, userName = 'Student', purpose = 'Account Verification') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${purpose}</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; color: #374151; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 40px 20px; text-align: center; border-bottom: 4px solid #0369a1; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; text-align: center; }
        .content p { font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4b5563; }
        .otp-box { background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 24px; margin: 30px 0; }
        .otp { font-size: 42px; font-weight: 900; color: #0ea5e9; letter-spacing: 8px; margin: 0; font-family: monospace; }
        .footer { background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
        .footer p { color: #94a3b8; font-size: 13px; margin: 0; }
        .disclaimer { font-size: 13px; color: #94a3b8; text-align: center; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>FindIt@Campus</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>We received a request for ${purpose.toLowerCase()} for your FindIt@Campus account. Please use the following 6-digit verification code:</p>
          
          <div class="otp-box">
             <p class="otp">${otp}</p>
          </div>
          
          <p class="disclaimer">This secure code will expire in 10 minutes. Do not share it with anyone.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} FindIt@Campus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { verifyOtpTemplate };
