import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for the animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200); // 2.2 seconds loader
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative text-slate-200 selection:bg-sky-500/30">
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sky-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Expertise />
        <Portfolio />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}