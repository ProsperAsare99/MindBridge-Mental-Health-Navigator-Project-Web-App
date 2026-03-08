import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER || 'mock-user',
        pass: process.env.EMAIL_PASS || 'mock-pass',
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify?token=${token}`;

    const mailOptions = {
        from: '"MindBridge Navigator" <noreply@mindbridge.com>',
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

        const testUrl = nodemailer.getTestMessageUrl(info);
        console.log('\n\n' + '='.repeat(50));
        console.log('📧 VERIFICATION EMAIL SENT');
        console.log(`To: ${email}`);
        console.log(`URL: ${url}`);
        if (testUrl) {
            console.log(`View on Ethereal: ${testUrl}`);
        }
        console.log('='.repeat(50) + '\n\n');

        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
};
