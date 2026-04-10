import { motion } from 'framer-motion';
import { ArrowRight, Github, MessageCircle, Instagram } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-sky-500/20 text-sky-400 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Hi, I'm <span className="text-gradient">Kartavya</span>.<br />
            I build digital experiences.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            A passionate Web Developer focused on crafting clean, responsive, and user-centric applications with modern technologies.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#portfolio" 
              className="px-8 py-4 rounded-full bg-gradient-custom text-white font-medium flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full glass-panel text-slate-200 font-medium hover:bg-slate-800/80 transition-all w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/webwithk' },
              { icon: MessageCircle, href: 'https://wa.me/918209990176' },
              { icon: Instagram, href: 'https://instagram.com/kartavya_panwar.9?igsh=MWFpYzN2MTR5bWVxNg==' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/30 transition-all transform hover:-translate-y-1"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}