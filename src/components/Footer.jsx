import { useState } from 'react';
import { profile } from '../data/resume';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#stack' },
  { label: 'Chat',       href: '#chat' },
  { label: 'Contact',    href: '#contact' },
];

const socialLinks = [
  { label: 'GH', href: profile.github,            external: true },
  { label: 'LI', href: profile.linkedin,           external: true },
  { label: 'EM', href: `mailto:${profile.email}`,  external: false },
];

function SocialButton({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: hovered
          ? '1px solid rgba(79,155,147,0.3)'
          : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        color: hovered ? '#4F9B93' : 'rgba(224,237,244,0.26)',
        background: hovered ? 'rgba(79,155,147,0.1)' : 'transparent',
        fontSize: 11,
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {item.label}
    </a>
  );
}

function NavLink({ link }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: hovered ? '#4F9B93' : 'rgba(224,237,244,0.26)',
        textDecoration: 'none',
        transition: 'color 0.15s ease',
      }}
    >
      {link.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0C0016',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Main row */}
        <div
          className="flex flex-wrap items-center justify-between"
          style={{ gap: 24 }}
        >
          {/* Left — branding */}
          <div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#4F9B93',
              display: 'block',
              marginBottom: 4,
            }}>
              {profile.name}
            </span>
            <span style={{
              fontSize: 11,
              color: 'rgba(224,237,244,0.26)',
            }}>
              React · Spline · Claude API
            </span>
          </div>

          {/* Center — nav */}
          <div className="hidden md:flex flex-wrap justify-center" style={{ gap: 20 }}>
            {navLinks.map(link => (
              <NavLink key={link.label} link={link} />
            ))}
          </div>

          {/* Right — social icons */}
          <div className="flex items-center" style={{ gap: 8 }}>
            {socialLinks.map(item => (
              <SocialButton key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <p style={{
          marginTop: 32,
          textAlign: 'center',
          fontSize: 11,
          color: 'rgba(224,237,244,0.26)',
        }}>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
