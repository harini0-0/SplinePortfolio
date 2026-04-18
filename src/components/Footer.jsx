import { profile } from '../data/resume';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 overflow-hidden"
            style={{ borderTop: '4px solid #ff6500' }}>

      <div className="pointer-events-none absolute inset-0 scene-footer" />
      <div className="pointer-events-none absolute inset-0 halftone opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* "THE END" comic book finale */}
        <div className="text-center mb-10">
          <div className="inline-block"
               style={{
                 border: '4px solid #ff6500',
                 boxShadow: '6px 6px 0 #ff6500',
                 background: '#120700',
                 padding: '12px 40px',
               }}>
            <p className="font-comic text-4xl text-comic-orange tracking-comic"
               style={{ textShadow: '3px 3px 0 #000' }}>
              — THE END —
            </p>
            <p className="font-comic text-sm text-comic-yellow/60 tracking-comic mt-1">
              BUT THE STORY CONTINUES...
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Left — branding */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-comic text-2xl text-comic-orange tracking-comic"
                  style={{ textShadow: '2px 2px 0 #000' }}>
              {profile.name}
            </span>
            <span className="text-xs text-[#f5ede0]/35 font-comic tracking-comic">
              BUILT WITH REACT · SPLINE · CLAUDE API
            </span>
          </div>

          {/* Center — nav */}
          <div className="flex flex-wrap justify-center gap-3">
            {['about', 'experience', 'projects', 'stack', 'chat', 'contact'].map(s => (
              <a key={s} href={`#${s}`}
                className="font-comic text-sm tracking-comic text-[#f5ede0]/40
                           hover:text-comic-orange transition-colors uppercase">
                {s}
              </a>
            ))}
          </div>

          {/* Right — social icons */}
          <div className="flex items-center gap-2">
            {[
              { href: profile.github,          label: 'GH' },
              { href: profile.linkedin,        label: 'LI' },
              { href: `mailto:${profile.email}`, label: '✉' },
            ].map(s => (
              <a key={s.label} href={s.href}
                target={s.label !== '✉' ? '_blank' : undefined}
                rel="noreferrer"
                className="btn-icon-comic font-comic text-sm"
                style={{ width: 36, height: 36 }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-[#f5ede0]/20 font-comic tracking-comic mt-8">
          © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
