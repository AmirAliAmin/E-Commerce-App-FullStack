export const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2>Hello ${name},</h2>
      <p>Thank you for registering on our E-commerce App.</p>
      <p>Your verification code is:</p>
      <h3 style="color: #0b79d0;">${url}</h3>
      <p>Please enter this code in the app to verify your email.</p>
      <br/>
      <p>Regards,<br/>E-commerce App Team</p>
    </div>
  `;
};
