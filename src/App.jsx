import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-neu-bg dark:bg-neu-dark transition-colors duration-300">
      <Navbar />
      <Hero />

      {/* Sections coming next */}
      {/* <About /> */}
      {/* <Experience /> */}
      {/* <Projects /> */}
      {/* <TechStack /> */}
      {/* <ChatBot /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </div>
  );
}