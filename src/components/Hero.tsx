import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="h-screen w-full relative overflow-hidden bg-[#050505] flex items-center justify-center" style={{ perspective: '2000px' }}>
      {/* Massive Background Text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-[20vw] font-black tracking-tighter text-white whitespace-nowrap opacity-30 select-none">
          KARTAVYA
        </h1>
      </motion.div>

      {/* 3D Rolodex Cube */}
      <div className="relative w-[80vw] h-[80vw] md:w-[40vh] md:h-[40vh] z-10 cube-wrapper">
        
        {/* Front Face */}
        <div className="cube-face md:[&]:![transform:rotateX(0deg)_translateZ(20vh)]" style={{ transform: 'rotateX(0deg) translateZ(40vw)' }}>
          <div className="w-full h-full relative border border-white/10 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Code" className="w-full h-full object-cover grayscale-hover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-black tracking-[0.2em] text-white">DEVELOPER</h2>
            </div>
          </div>
        </div>

        {/* Bottom Face */}
        <div className="cube-face md:[&]:![transform:rotateX(-90deg)_translateZ(20vh)]" style={{ transform: 'rotateX(-90deg) translateZ(40vw)' }}>
          <div className="w-full h-full relative border border-white/10 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Design" className="w-full h-full object-cover grayscale-hover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-black tracking-[0.2em] text-white">DESIGNER</h2>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="cube-face md:[&]:![transform:rotateX(-180deg)_translateZ(20vh)]" style={{ transform: 'rotateX(-180deg) translateZ(40vw)' }}>
          <div className="w-full h-full relative border border-white/10 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Code" className="w-full h-full object-cover grayscale-hover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-black tracking-[0.2em] text-white">CREATOR</h2>
            </div>
          </div>
        </div>

        {/* Top Face */}
        <div className="cube-face md:[&]:![transform:rotateX(90deg)_translateZ(20vh)]" style={{ transform: 'rotateX(90deg) translateZ(40vw)' }}>
          <div className="w-full h-full relative border border-white/10 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="UI" className="w-full h-full object-cover grayscale-hover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-black tracking-[0.2em] text-white">ENGINEER</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Floating CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#portfolio" className="flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-cyan-400 transition-colors">
          Scroll to Explore <ArrowRight size={16} className="animate-bounce-x" />
        </a>
      </motion.div>
    </section>
  );
}