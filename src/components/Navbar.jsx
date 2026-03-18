import { useState, useEffect } from 'react';

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Stack',      href: '#stack' },
  { label: 'Chat',       href: '#chat' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [dark,      setDark]      = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Shadow appears after scrolling 40px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Toggle dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-neu-bg dark:bg-neu-dark shadow-neu-flat dark:shadow-neu-flat-dark py-3'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Left — name logo */}
        <a
          href="#"
          className="font-bold text-lg tracking-tight text-gray-800 dark:text-gray-100
                     hover:text-indigo-500 transition-colors"
        >
          Harini Thirunavukkarasan {/* ← replace with your initials or name */}
        </a>

        {/* Right — desktop links + dark toggle */}
        <div className="hidden md:flex items-center gap-2">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 text-sm font-medium text-gray-500
                         hover:text-indigo-500 dark:text-gray-400
                         dark:hover:text-indigo-400 transition-colors rounded-lg
                         hover:shadow-neu-pressed dark:hover:shadow-neu-pressed-dark
                         hover:bg-neu-bg dark:hover:bg-neu-dark"
            >
              {l.label}
            </a>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-2" />

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            className="neu-btn text-gray-600 dark:text-gray-300 px-4 py-2"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>

        {/* Right — mobile hamburger */}
        <button
          className="md:hidden neu-btn px-3 py-2 text-gray-600 dark:text-gray-300"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mt-2 mx-4 rounded-2xl bg-neu-bg dark:bg-neu-dark
                     shadow-neu-flat dark:shadow-neu-flat-dark px-6 py-5
                     flex flex-col gap-4"
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300
                         hover:text-indigo-500 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700" />
          <button
            onClick={() => { setDark(d => !d); setMenuOpen(false); }}
            className="neu-btn text-sm text-gray-600 dark:text-gray-300 self-start"
          >
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>
      )}
    </nav>
  );
}