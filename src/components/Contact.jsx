import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const cardStyle = {
  background:     'rgba(18, 6, 30, 0.7)',
  border:         '1px solid rgba(255,255,255,0.07)',
  borderRadius:   16,
  backdropFilter: 'blur(8px)',
  boxShadow:      '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
};

const contactLinks = [
  {
    label: 'Email',
    initials: 'EM',
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    label: 'LinkedIn',
    initials: 'LI',
    value: 'linkedin.com/in/harini-thirunavukkarasan',
    href: profile.linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    initials: 'GH',
    value: 'github.com/harini0-0',
    href: profile.github,
    external: true,
  },
];

function validate(form) {
  const errors = {};
  if (!form.name.trim())    errors.name    = 'Name is required';
  if (!form.email.trim())   errors.email   = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.subject.trim()) errors.subject = 'Subject is required';
  if (!form.message.trim()) errors.message = 'Message is required';
  return errors;
}

function ContactLink({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardStyle,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        textDecoration: 'none',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        border: hovered
          ? '1px solid rgba(79,155,147,0.2)'
          : '1px solid rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 36px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Icon area */}
      <div style={{
        width: 38, height: 38, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(79,155,147,0.1)',
        border: '1px solid rgba(79,155,147,0.2)',
        borderRadius: 10,
        color: '#4F9B93',
        fontSize: 11,
        fontWeight: 700,
      }}>
        {item.initials}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 10,
          color: 'rgba(224,237,244,0.26)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: 3,
        }}>
          {item.label}
        </p>
        <p style={{
          fontSize: 14,
          color: hovered ? '#4F9B93' : 'rgba(224,237,244,0.5)',
          transition: 'color 0.15s ease',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {item.value}
        </p>
      </div>

      {/* Arrow */}
      <svg
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        style={{
          width: 16, height: 16, flexShrink: 0,
          color: hovered ? '#4F9B93' : 'rgba(224,237,244,0.26)',
          transition: 'color 0.15s ease',
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

function FormField({ name, value, onChange, placeholder, error, type = 'input', rows }) {
  const [focused, setFocused] = useState(false);

  const baseStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: error
      ? '1px solid rgba(239,68,68,0.6)'
      : focused
        ? '1px solid rgba(79,155,147,0.4)'
        : '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 14,
    color: '#E0EDF4',
    outline: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
  };

  return (
    <div>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={rows || 4}
          style={{ ...baseStyle, resize: 'none' }}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={baseStyle}
        />
      )}
      {error && (
        <p style={{ fontSize: 12, color: 'rgba(239,68,68,0.8)', marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: undefined }));
  }

  async function handleSubmit() {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: '#0C0016' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#4F9B93',
            textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10,
          }}>
            06 / Contact
          </p>
          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#E0EDF4', letterSpacing: '-0.03em', lineHeight: 1,
          }}>
            Get in touch
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(224,237,244,0.5)', marginTop: 10 }}>
            Recruiters, collaborators, or the curious — inbox is open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Left — contact links + availability */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
            {contactLinks.map(item => (
              <ContactLink key={item.label} item={item} />
            ))}

            {/* Availability card */}
            <div style={{
              ...cardStyle,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: '#4ade80',
                boxShadow: '0 0 6px rgba(74,222,128,0.6)',
              }} />
              <div>
                <p style={{
                  fontSize: 11, color: '#4F9B93',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: 3,
                }}>
                  Open to opportunities
                </p>
                <p style={{ fontSize: 14, color: 'rgba(224,237,244,0.5)' }}>
                  {profile.availability}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...fadeUp(0.2)}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  ...cardStyle,
                  padding: '40px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 320,
                  textAlign: 'center',
                  gap: 16,
                }}
              >
                {/* Checkmark circle */}
                <div style={{
                  width: 56, height: 56,
                  border: '2px solid #4F9B93',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 4,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4F9B93" strokeWidth="2.5"
                       style={{ width: 26, height: 26 }}>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 style={{
                  fontWeight: 700, fontSize: '1.6rem',
                  color: '#E0EDF4', letterSpacing: '-0.02em',
                }}>
                  Message sent!
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(224,237,244,0.5)' }}>
                  I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: '#4F9B93',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <div style={{ ...cardStyle, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <FormField
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  error={errors.name}
                />
                <FormField
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  error={errors.email}
                />
                <FormField
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  error={errors.subject}
                />
                <FormField
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message..."
                  error={errors.message}
                  type="textarea"
                  rows={4}
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: '#4F9B93',
                    color: '#0C0016',
                    fontWeight: 700,
                    fontSize: 14,
                    padding: '13px',
                    borderRadius: 10,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.15s ease',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
