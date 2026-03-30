const nodemailer = require('nodemailer');
const { verifyOtpTemplate } = require('./emailTemplate');

const sendEmail = async (options) => {
  let transporter;
  let usingEthereal = false;

  // Always print OTP to terminal for development convenience
  console.log(`\n==========================================`);
  console.log(`🔑 OTP for ${options.email}: ${options.otp}`);
  console.log(`==========================================\n`);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS &&
      process.env.SMTP_USER !== 'your_gmail@gmail.com') {
    // Real SMTP (Gmail or other)
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,           // Use STARTTLS (not SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Avoid self-signed cert issues
      },
    });
  } else {
    // Fall back to Ethereal fake SMTP for development
    usingEthereal = true;
    console.log(`⚠️  SMTP not configured — using Ethereal (fake SMTP). Emails won't arrive in real inboxes.`);
    console.log(`   → Edit SMTP_USER and SMTP_PASS in backend/.env with your Gmail App Password.\n`);
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const message = {
    from: `${process.env.FROM_NAME || 'FindIt@Campus'} <${process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@finditcampus.edu'}>`,
    to: options.email,
    subject: options.subject,
    html: verifyOtpTemplate(options.otp, options.userName, options.purpose),
  };

  const info = await transporter.sendMail(message);

  if (usingEthereal) {
    console.log(`📧 Ethereal preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } else {
    console.log(`✅ Email sent to ${options.email}`);
  }
};

module.exports = sendEmail;
