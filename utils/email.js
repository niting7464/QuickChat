import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your preferred email service
      auth: {
        user: process.env.SMTP_EMAIL, // Your email address
        pass: process.env.SMTP_PASSWORD, // Your email password
      },
    });

    // Define email options
    const mailOptions = {
      from: `Your App <${process.env.SMTP_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error("Email could not be sent");
  }
};
