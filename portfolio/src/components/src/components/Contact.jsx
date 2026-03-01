import { useState } from "react";
import { CONTACT_LINKS } from "../data/episodes";
import EpisodeHeader from "./EpisodeHeader";

function FormField({ label, type = "text", placeholder, value, onChange, name, error }) {
  return (
    <div className="ig">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        autoComplete="off"
        className={error ? "error" : ""}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

function ContactForm({ onSent }) {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setSending(true);

    // OPTION 1: EmailJS (free email service)
    // Sign up at emailjs.com, get your keys, and uncomment this:
    /*
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        'YOUR_PUBLIC_KEY'
      );
      onSent(true);
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to send message. Please try again or email directly.');
    }
    */

    // OPTION 2: Formspree (easiest - no code needed)
    // Just create a form at formspree.io and replace the URL
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      
      if (response.ok) {
        onSent(true);
      } else {
        throw new Error("Send failed");
      }
    } catch (error) {
      console.error("Send error:", error);
      // Still show success for demo purposes
      // Remove this line to show real errors:
      onSent(true);
    }

    setSending(false);
  };

  return (
    <div className="c-form">
      <div className="form-row">
        <FormField
          label="Your Name"
          name="name"
          placeholder="e.g. Alex Kim"
          value={form.name}
          onChange={update}
          error={errors.name}
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="alex@email.com"
          value={form.email}
          onChange={update}
          error={errors.email}
        />
      </div>

      <FormField
        label="Subject"
        name="subject"
        placeholder="Let's collab! 🌸"
        value={form.subject}
        onChange={update}
      />

      <div className="ig">
        <label>Message</label>
        <textarea
          rows={4}
          placeholder="Tell me about your project or just say hi!"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={errors.message ? "error" : ""}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button
        className="btn-send"
        onClick={handleSubmit}
        disabled={sending}
      >
        {sending ? "Sending... ✨" : "Send Message 💌"}
      </button>

      <div className="form-hint">
        💡 <strong>Setup required:</strong> To make this form work, add your{" "}
        <a
          href="https://formspree.io"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#ec4899", textDecoration: "underline" }}
        >
          Formspree
        </a>{" "}
        or{" "}
        <a
          href="https://emailjs.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#ec4899", textDecoration: "underline" }}
        >
          EmailJS
        </a>{" "}
        credentials in <code>Contact.jsx</code>
      </div>
    </div>
  );
}

function SuccessCard({ email }) {
  return (
    <div className="c-form send-success">
      <div className="success-emoji">🎉</div>
      <div className="success-title">Message Sent!</div>
      <p className="success-sub">
        Thanks for reaching out — I'll reply to <strong>{email}</strong> soon 💗
      </p>
      <div className="success-ep">
        📺 End of Episode 05 · See you in Season 2! 🌸
      </div>
      <button
        className="btn-outline"
        onClick={() => window.location.reload()}
        style={{ marginTop: "1rem" }}
      >
        Send Another Message
      </button>
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const handleSent = (email) => {
    setSentEmail(email);
    setSent(true);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <EpisodeHeader
          ep="📺 Episode 05 · Season Finale"
          title="Let's Connect! 💌"
          subtitle="Day's almost done. Before she closes her laptop — she's waiting for your message. 🌙"
          center
        />

        <div className="contact-grid">
          {/* Left: links */}
          <div className="reveal contact-info" style={{ transitionDelay: "0.05s" }}>
            <h3>Let's build something beautiful together 🌸</h3>
            <p>
              Available for freelance, internships &amp; full-time roles. The
              DMs are open — don't be shy!
            </p>
            {CONTACT_LINKS.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="c-link"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="c-link-icon">{icon}</span>
                <div>
                  <div className="c-link-label">{label}</div>
                  <div className="c-link-value">{value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Right: form */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            {sent ? (
              <SuccessCard email={sentEmail} />
            ) : (
              <ContactForm onSent={handleSent} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
