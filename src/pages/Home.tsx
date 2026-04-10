import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen relative text-slate-200 selection:bg-sky-500/30">
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