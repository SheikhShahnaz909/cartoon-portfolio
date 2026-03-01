import { useState } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT_LINKS } from "../data/episodes";
import EpisodeHeader from "./EpisodeHeader";



function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
}) {
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

//contact 

function ContactForm({ onSent }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email";
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

    try {
      await emailjs.send(
        "service_vh0u6ev",       
        "template_5ie0f8q",      
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "1tQn_vODyKltrEloS"       
      );

      onSent(form.email);
    } catch (error) {
      console.error("Email error:", error);
      alert("Failed to send message. Please try again.");
    }

    setSending(false);
  };

  return (
    <div className="c-form">
      <div className="form-row">
        <FormField
          label="Your Name"
          name="name"
          placeholder="e.g. Shahnaz 🌸"
          value={form.name}
          onChange={update}
          error={errors.name}
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@gmail.com"
          value={form.email}
          onChange={update}
          error={errors.email}
        />
      </div>

      <FormField
        label="Subject"
        name="subject"
        placeholder="Let's collaborate! 💗"
        value={form.subject}
        onChange={update}
      />

      <div className="ig">
        <label>Message</label>
        <textarea
          rows={4}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={errors.message ? "error" : ""}
        />
        {errors.message && (
          <span className="form-error">{errors.message}</span>
        )}
      </div>

      <button
        className="btn-send"
        onClick={handleSubmit}
        disabled={sending}
      >
        {sending ? "Sending... ✨" : "Send Message 💌"}
      </button>
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
          subtitle="Before she closes her laptop — she's waiting for your message. 🌙"
          center
        />

        <div className="contact-grid">
          <div className="reveal contact-info">
            <h3>Let's build something beautiful together 🌸</h3>
            <p>
              Available for freelance, internships & full-time roles.
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
          <div className="reveal">
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