import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        {/* Ambient background glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-sky-500/20 blur-[50px] rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />

        {/* Logo Container */}
        <div className="relative">
          {/* Spinning Outer Ring */}
          <motion.div 
            className="absolute -inset-3 rounded-2xl border-2 border-slate-800 border-t-sky-400 border-b-indigo-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing Logo */}
          <motion.div 
            className="relative w-20 h-20 rounded-xl bg-gradient-custom flex items-center justify-center text-white font-heading font-bold text-3xl shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            KSP
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div 
          className="mt-10 text-sky-400 font-medium tracking-widest text-sm uppercase flex items-center gap-1"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading
          <span className="flex gap-0.5">
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>.</motion.span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}