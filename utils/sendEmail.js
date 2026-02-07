import nodemailer from "nodemailer";

/* ---------------------------------------
   Create reusable transporter
---------------------------------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------------------------------------
   1️⃣ Newsletter / Welcome Email
---------------------------------------- */
export const sendWelcomeEmail = async (toEmail) => {
  await transporter.sendMail({
    from: `"KHA Journeys" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to KHA Journeys – Ziyarat Awaits You 🌙",
    html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #eee;">
        
        <div style="background:#5B0D15;color:#fff;padding:20px;text-align:center;">
          <h2 style="margin:0;">KHA Journeys</h2>
          <p style="margin:5px 0;font-size:14px;">
            Serving the Guests of Imam Husain (A.S)
          </p>
        </div>

        <div style="padding:24px;color:#333;line-height:1.6;">
          <p><strong>Assalamu Alaikum,</strong></p>

          <p>
            Thank you for subscribing to <strong>KHA Journeys</strong>.
            We are honored to welcome you into our Ziyarat family.
          </p>

          <p>You will now receive:</p>
          <ul>
            <li>Exclusive Ziyarat offers</li>
            <li>Iran & Iraq tour announcements</li>
            <li>Arbaeen & special campaign updates</li>
            <li>Important guidance for Zawwār</li>
          </ul>

          <p>
            May Allah accept your niyyah and grant you the blessing of
            Ziyarat of <strong>Imam Husain (A.S)</strong>.
          </p>

          <p style="margin-top:20px;">
            <strong>Labbaik Ya Husain (A.S)</strong><br/>
            — Team KHA Journeys
          </p>
        </div>

        <div style="background:#f7f7f7;padding:12px;text-align:center;font-size:12px;color:#777;">
          © ${new Date().getFullYear()} KHA Journeys. All rights reserved.
        </div>
      </div>
    `,
  });
};

/* ---------------------------------------
   2️⃣ Campaign Participation Confirmation
---------------------------------------- */
export const sendCampaignConfirmation = async (data) => {
  await transporter.sendMail({
    from: `"KHA Journeys" <${process.env.EMAIL_USER}>`,
    to: data.email || process.env.EMAIL_USER,
    subject: "Arbaeen Campaign Participation Confirmed 🤍",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2>Assalamu Alaikum ${data.name},</h2>

        <p>
          Your participation in the
          <strong>₹100 Arbaeen Ziyarat Campaign</strong>
          has been successfully recorded.
        </p>

        <p><strong>Contribution:</strong> ₹${data.amount}</p>

        <p>
          May Allah accept your niyyah and grant you the honor
          of Ziyarat of Imam Husain (A.S).
        </p>

        <p style="margin-top:20px;">
          <strong>Labbaik Ya Husain (A.S)</strong><br/>
          — KHA Journeys
        </p>
      </div>
    `,
  });
};

/* ---------------------------------------
   3️⃣ Admin Notification (Newsletter)
---------------------------------------- */
export const sendAdminSubscriberAlert = async (email) => {
  await transporter.sendMail({
    to: "karwanehasanaskari786@gmail.com",
    subject: "📩 New Newsletter Subscriber",
    text: `New user subscribed to KHA Journeys:\n\nEmail: ${email}`,
  });
};


export const sendAdminNotification = async (email) => {
  await transporter.sendMail({
    to: "karwanehasanaskari786@gmail.com",
    subject: "📩 New Newsletter Subscriber",
    text: `New user subscribed:\n${email}`,
  });
};

/* ---------------------------------------
   4️⃣ Admin Notification (Campaign)
---------------------------------------- */
export const sendAdminCampaignAlert = async (data) => {
  await transporter.sendMail({
    to: "karwanehasanaskari786@gmail.com",
    subject: "🕋 New Arbaeen Campaign Participation",
    text: `
New Campaign Participant

Name: ${data.name}
Phone: ${data.phone}
City: ${data.city}
Amount: ₹${data.amount}
Note: ${data.note || "N/A"}
    `,
  });
};
