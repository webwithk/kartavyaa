import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Expertise() {
  return (
    <section id="expertise" className="py-32 relative bg-[#171e19] text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-[90rem]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Asymmetric Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Cyan Decorative Square */}
            <div className="absolute -top-12 -left-12 w-full h-full bg-[#d5f4f9] opacity-20 z-0"></div>
            
            <div className="relative z-10 aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Workspace" 
                className="w-full h-full object-cover filter grayscale"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-12"
          >
            <span className="font-heading text-[#b7c6c2] text-xl uppercase tracking-widest block mb-6">Featured Focus</span>
            
            <h2 className="text-5xl md:text-7xl font-heading tracking-tighter leading-[0.9] mb-8">
              CRAFTING PIXEL-PERFECT INTERFACES
            </h2>
            
            <p className="text-[#9f8d8b] text-lg font-light leading-relaxed mb-12 max-w-lg">
              I specialize in transforming complex problems into elegant, intuitive designs. Every line of code is written with performance, accessibility, and the end-user in mind.
            </p>

            <a href="#contact" className="inline-flex items-center gap-4 text-white font-bold tracking-widest uppercase text-sm group">
              Start a Project 
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#171e19] transition-all duration-300">
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}