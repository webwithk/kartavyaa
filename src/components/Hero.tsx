import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import TubesBackground from './TubesBackground';

export default function Hero() {
  return (
    <TubesBackground className="bg-[#171e19]">
      <section id="home" className="h-screen w-full relative overflow-hidden flex flex-col justify-center">
        
        {/* Ambient Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b7c6c2] rounded-full blur-[120px] opacity-20 animate-float pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bbe2f5] rounded-full blur-[120px] opacity-20 animate-float pointer-events-none" style={{ animationDelay: '3s' }}></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="flex flex-col items-center justify-center w-full mt-20">
            
            {/* Massive Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] leading-[0.85] tracking-tighter text-white text-center w-full"
            >
              KARTAVYA
            </motion.h1>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] leading-[0.85] tracking-tighter text-outline text-center w-full"
            >
              SINGH PANWAR
            </motion.h1>

            {/* Bottom Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full flex flex-col md:flex-row justify-between items-center mt-16 md:mt-24 gap-8"
            >
              <p className="text-[#9f8d8b] uppercase tracking-widest text-xs md:text-sm font-semibold max-w-[320px] text-center md:text-left leading-relaxed">
                A passionate Web Developer focused on crafting clean, responsive, and user-centric applications with modern technologies.
              </p>

              <a 
                href="#portfolio" 
                className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#171e19] transition-all duration-500 ease-fluid group"
              >
                <ArrowDown size={24} strokeWidth={1.5} className="group-hover:animate-bounce" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </TubesBackground>
  );
}