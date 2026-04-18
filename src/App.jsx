import { useEffect } from 'react';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Experience from './components/Experience';
import Projects   from './components/Projects';
import TechStack  from './components/TechStack';
import ChatBot    from './components/ChatBot';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

/**
 * Comic-book panel gutter — the thick border between scenes.
 * `from` / `to` are the adjacent section accent colours so the
 * gutter visually bridges the two panels.
 */
function PanelGutter({ from = '#ff6500', to = '#ffd600' }) {
  return (
    <div style={{ position: 'relative', zIndex: 10, height: 10, overflow: 'hidden' }}>
      {/* top half = "from" colour */}
      <div style={{ position: 'absolute', inset: 0, bottom: '50%', background: from }} />
      {/* bottom half = "to" colour */}
      <div style={{ position: 'absolute', inset: 0, top: '50%', background: to }} />
      {/* central line — crisp black rule like a comic border */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%',
                    height: 2, marginTop: -1, background: '#000' }} />
    </div>
  );
}

export default function App() {
  // Comic book theme is dark-only — force permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-comic-bg">
      <Navbar />

      {/* Hero & About — unchanged, same base dark bg */}
      <Hero />
      <About />

      {/* ── Scene transition ── */}
      <PanelGutter from="#080400" to="#0f0400" />

      {/* Experience — horizontal speed lines, reddish-dark */}
      <Experience />

      <PanelGutter from="#0f0400" to="#080300" />

      {/* Projects — radial burst, deep dark */}
      <Projects />

      <PanelGutter from="#080300" to="#130700" />

      {/* TechStack — diagonal yellow lines */}
      <TechStack />

      <PanelGutter from="#130700" to="#07080f" />

      {/* Chat — vertical blue-tinted lines (contrast break) */}
      <ChatBot />

      <PanelGutter from="#07080f" to="#110400" />

      {/* Contact — radial burst, warm red */}
      <Contact />

      <PanelGutter from="#110400" to="#050200" />

      {/* Footer — near black */}
      <Footer />
    </div>
  );
}
