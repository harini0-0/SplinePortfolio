import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Experience      from './components/Experience';
import Projects        from './components/Projects';
import TechStack       from './components/TechStack';
import ChatBot         from './components/ChatBot';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import ProjectDetail   from './pages/ProjectDetail';

function Portfolio() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-comic-bg">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <ChatBot />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  );
}
