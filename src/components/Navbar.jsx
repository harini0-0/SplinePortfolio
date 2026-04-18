import { useState, useEffect } from 'react';

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Stack',      href: '#stack' },
  { label: 'Chat',       href: '#chat' },
  { label: 'Contact',    href: '#contact' },
];

// Comic sparkle SVG
const Spark = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffd600">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'glass-nav py-2' : 'py-4 bg-transparent'}`}>

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-comic text-2xl text-comic-orange tracking-comic
                           group-hover:text-comic-yellow transition-colors">
            HT
          </span>
          <Spark />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="font-comic tracking-comic text-base text-[#f5ede0]/70
                         hover:text-comic-orange px-3 py-1 transition-colors duration-150
                         border border-transparent hover:border-comic-orange/40
                         hover:bg-comic-orange/8 rounded-sm">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden btn-icon-comic"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu">
          {menuOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6"  x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 panel px-6 py-5 flex flex-col gap-3">
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-comic tracking-comic text-lg text-[#f5ede0]
                         hover:text-comic-orange transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
