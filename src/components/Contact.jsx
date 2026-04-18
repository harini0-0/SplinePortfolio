import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const contactLinks = [
  { label: 'EMAIL',    value: profile.email,                              href: `mailto:${profile.email}`, emoji: '✉' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/harini-thirunavukkarasan', href: profile.linkedin,          emoji: 'in' },
  { label: 'GITHUB',   value: 'github.com/harini0-0',                    href: profile.github,            emoji: '</>' },
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
    <section id="contact" className="relative py-24 px-6 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 scene-contact" />
      <div className="pointer-events-none absolute inset-0 halftone opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-14 flex items-center gap-5">
          <div className="panel-number">📡</div>
          <div>
            <h2 className="font-comic text-5xl text-comic-orange tracking-comic"
                style={{ textShadow: '3px 3px 0 #000' }}>
              SIGNAL ME
            </h2>
            <p className="section-subheading mt-1">
              Recruiters, collaborators, or the curious — inbox is open.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Left — contact links */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">

            {contactLinks.map(c => (
              <a key={c.label} href={c.href}
                target={c.label !== 'EMAIL' ? '_blank' : undefined}
                rel="noreferrer"
                className="group"
                style={{
                  display: 'block',
                  background: '#120700',
                  border: '3px solid #ff6500',
                  boxShadow: '4px 4px 0 #ff6500',
                  borderRadius: 4,
                  padding: '16px 20px',
                  transition: 'transform 0.12s, box-shadow 0.12s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translate(-2px,-2px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 #ff6500';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translate(0,0)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 #ff6500';
                }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center font-comic text-sm shrink-0"
                       style={{ background: '#ff6500', border: '2px solid #000',
                                boxShadow: '2px 2px 0 #000', borderRadius: 2, color: '#000' }}>
                    {c.emoji}
                  </div>
                  <div>
                    <p className="font-comic tracking-comic text-xs text-[#f5ede0]/40">{c.label}</p>
                    <p className="text-sm text-[#f5ede0] group-hover:text-comic-orange transition-colors">
                      {c.value}
                    </p>
                  </div>
                  <svg className="ml-auto w-4 h-4 text-comic-orange/40 group-hover:text-comic-orange transition-colors"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            ))}

            {/* Availability bubble */}
            <div className="panel-yellow p-5 flex items-start gap-3"
                 style={{ boxShadow: '4px 4px 0 #ffd600' }}>
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse mt-0.5 shrink-0" />
              <div>
                <p className="font-comic tracking-comic text-sm text-comic-yellow mb-1">
                  CURRENTLY AVAILABLE
                </p>
                <p className="text-sm text-[#f5ede0]/65">{profile.availability}</p>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div {...fadeUp(0.2)}>
            {sent ? (
              <motion.div
                className="panel flex flex-col items-center justify-center gap-5
                           min-h-[300px] text-center"
                style={{ boxShadow: '6px 6px 0 #ff6500' }}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="starburst text-2xl" style={{ width: 80, height: 80 }}>
                  ✓
                </div>
                <h3 className="font-comic text-3xl text-comic-yellow tracking-comic">
                  MESSAGE SENT!
                </h3>
                <p className="text-sm text-[#f5ede0]/60">
                  I'll get back to you soon. Thanks for reaching out!
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-comic-outline">
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <div className="panel flex flex-col gap-4 p-6"
                   style={{ boxShadow: '6px 6px 0 #ff6500' }}>
                {[
                  { name: 'name',    placeholder: 'Your name, hero...' },
                  { name: 'email',   placeholder: 'Your signal address (email)...' },
                  { name: 'subject', placeholder: 'Mission subject...' },
                ].map(f => (
                  <div key={f.name}>
                    <input name={f.name} value={form[f.name]} onChange={handleChange}
                      placeholder={f.placeholder}
                      className={`field-comic ${errors[f.name] ? 'border-red-500' : ''}`} />
                    {errors[f.name] && (
                      <p className="text-xs text-red-400 mt-1 font-comic tracking-comic">
                        ⚠ {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Your message..."
                    rows={4}
                    className={`field-comic resize-none ${errors.message ? 'border-red-500' : ''}`} />
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1 font-comic tracking-comic">
                      ⚠ {errors.message}
                    </p>
                  )}
                </div>

                <button onClick={handleSubmit} disabled={loading}
                  className="btn-comic w-full disabled:opacity-50 disabled:cursor-not-allowed mt-1">
                  {loading ? 'TRANSMITTING...' : 'SEND MESSAGE ⚡'}
                </button>
                <p className="text-xs text-center text-[#f5ede0]/30 font-comic tracking-comic">
                  BACKEND (EMAILJS) COMING SOON
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
