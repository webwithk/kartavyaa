import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Instagram, Code2, Sparkles, Layers } from 'lucide-react';
import TubesBackground from './TubesBackground';

export default function Hero() {
  return (
    <TubesBackground className="pt-20 pb-12 flex items-center justify-center">
      <section id="home" className="w-full flex items-center justify-center relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute -top-12 -left-4 md:-left-16 glass-panel p-4 rounded-2xl text-sky-400 hidden sm:block"
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={32} />
          </motion.div>
          
          <motion.div 
            className="absolute top-24 -right-4 md:-right-16 glass-panel p-4 rounded-2xl text-indigo-400 hidden sm:block"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Layers size={32} />
          </motion.div>

          <motion.div 
            className="absolute bottom-12 left-12 md:left-0 glass-panel p-3 rounded-2xl text-purple-400 hidden sm:block z-[-1]"
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Sparkles size={24} />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-sky-500/30 text-sky-400 text-sm font-medium shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-md"
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
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
          >
            Hi, I'm <span className="text-gradient relative inline-block">
              Kartavya
              {/* Underline swoosh */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-sky-500 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>.<br />
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
              className="group relative px-8 py-4 rounded-full bg-gradient-custom text-white font-medium flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full glass-panel text-slate-200 font-medium hover:bg-slate-800/80 hover:border-sky-500/50 transition-all w-full sm:w-auto text-center"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex items-center justify-center gap-6 pb-12"
          >
            {[
              { icon: Mail, href: 'mailto:kartavyasinghpanwar44@gmail.com' },
              { icon: MessageCircle, href: 'https//wa.me/918209990176' },
              { icon: Instagram, href: 'https://instagram.com/kartavya_panwar.9?igsh=MWFpYzN2MTR5bWVxNg==' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400/50 transition-all transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>
        </div>
      </section>
    </TubesBackground>
  );
}