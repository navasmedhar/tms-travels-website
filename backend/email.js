const nodemailer = require("nodemailer");

function createTransport() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("[EMAIL] EMAIL_USER or EMAIL_PASS not set – email sending disabled.");
    return null;
  }
 return nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  tls: {
    rejectUnauthorized: false,
  },
});
}

async function sendBookingEmails(booking) {
  const transporter = createTransport();
  if (!transporter) return;

  const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;
  const travelDate = booking.travelDate
    ? new Date(booking.travelDate).toLocaleDateString("en-IN")
    : "—";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
      <div style="background:linear-gradient(135deg,#1a56db,#f97316);padding:16px 24px;border-radius:6px;margin-bottom:24px;">
        <h1 style="color:white;margin:0;font-size:20px;">🚗 New Booking — TMS Travels</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#666;width:140px;">Customer</td><td style="padding:8px 0;font-weight:600;">${booking.name}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Mobile</td><td style="padding:8px 0;"><a href="tel:${booking.mobile}">${booking.mobile}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666;">Pickup</td><td style="padding:8px 0;">${booking.pickup}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Destination</td><td style="padding:8px 0;">${booking.destination}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Vehicle</td><td style="padding:8px 0;">${booking.vehicle}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Trip Type</td><td style="padding:8px 0;">${booking.tripType || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Travel Date</td><td style="padding:8px 0;"><strong>${travelDate}</strong></td></tr>
        ${booking.message ? `<tr><td style="padding:8px 0;color:#666;">Notes</td><td style="padding:8px 0;">${booking.message}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:12px;background:#fff3e8;border-radius:6px;font-size:13px;color:#666;">
        Booking ID: <strong>${booking._id}</strong>
      </div>
      <div style="margin-top:16px;">
        <a href="tel:${booking.mobile}" style="display:inline-block;padding:10px 20px;background:#25D366;color:white;text-decoration:none;border-radius:6px;font-weight:600;">📞 Call Customer</a>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"TMS Travels Website" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      subject: `🚗 New Booking: ${booking.name} → ${booking.destination} on ${travelDate}`,
      html,
    });
    console.log(`[EMAIL] Owner notified for booking ${booking._id}`);
  } catch (err) {
    console.error("[EMAIL] Failed:", err.message);
  }
}

async function sendContactEmail(contact) {
  const transporter = createTransport();
  if (!transporter) return;

  const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
      <h2 style="color:#0d1b2a;">📩 New Contact Message — TMS Travels</h2>
      <p><strong>From:</strong> ${contact.name}</p>
      ${contact.email ? `<p><strong>Email:</strong> ${contact.email}</p>` : ""}
      ${contact.mobile ? `<p><strong>Mobile:</strong> ${contact.mobile}</p>` : ""}
      ${contact.subject ? `<p><strong>Subject:</strong> ${contact.subject}</p>` : ""}
      <p><strong>Message:</strong></p>
      <blockquote style="border-left:3px solid #f97316;margin:0;padding:12px 16px;background:#fff3e8;border-radius:0 6px 6px 0;">${contact.message}</blockquote>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"TMS Travels Website" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      subject: `📩 Contact: ${contact.name} — ${contact.subject || "No subject"}`,
      html,
    });
  } catch (err) {
    console.error("[EMAIL] Contact email failed:", err.message);
  }
}

module.exports = { sendBookingEmails, sendContactEmail };
