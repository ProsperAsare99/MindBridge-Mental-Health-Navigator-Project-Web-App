"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER || 'mock-user',
        pass: process.env.EMAIL_PASS || 'mock-pass',
    },
});
const sendVerificationEmail = async (email, token) => {
    const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify?token=${token}`;
    const fromName = process.env.EMAIL_FROM_NAME || 'MindBridge Navigator';
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@mindbridge.com';
    const mailOptions = {
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: 'Verify your email address',
        html: `
            <h1>Welcome to MindBridge</h1>
            <p>Please click the link below to verify your email address and activate your account:</p>
            <a href="${url}">${url}</a>
            <p>If you did not request this, please ignore this email.</p>
        `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        const testUrl = nodemailer_1.default.getTestMessageUrl(info);
        console.log('\n\n' + '='.repeat(50));
        console.log('📧 VERIFICATION EMAIL SENT');
        console.log(`To: ${email}`);
        console.log(`URL: ${url}`);
        if (testUrl) {
            console.log(`View on Ethereal: ${testUrl}`);
        }
        console.log('='.repeat(50) + '\n\n');
        return true;
    }
    catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=emailService.js.map