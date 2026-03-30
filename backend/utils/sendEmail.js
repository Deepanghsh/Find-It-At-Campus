const nodemailer = require('nodemailer');
const { resetPasswordTemplate } = require('./emailTemplate');

const sendEmail = async (options) => {
  // If no SMTP settings are provided, use Ethereal (fake SMTP service) for testing
  let transporter;
  
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    console.log(`⚠️  Using Ethereal Fake SMTP. Configure SMTP_ settings in .env for production.`);
  }

  const message = {
    from: `${process.env.FROM_NAME || 'FindIt@Campus'} <${process.env.FROM_EMAIL || 'noreply@finditcampus.edu'}>`,
    to: options.email,
    subject: options.subject,
    html: resetPasswordTemplate(options.resetUrl, options.userName),
  };

  const info = await transporter.sendMail(message);

  if (!process.env.SMTP_HOST) {
    console.log(`📧  Preview Email URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
};

module.exports = sendEmail;
