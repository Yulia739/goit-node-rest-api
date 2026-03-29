import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.UKRNET_EMAIL,
    pass: process.env.UKRNET_PASSWORD,
  },
});

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
  await transport.sendMail({
    from: process.env.UKRNET_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Click the link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  });
}

export { sendVerificationEmail };
