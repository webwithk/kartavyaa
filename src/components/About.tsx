import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Stat {
  id: number;
  value: string;
  label: string;
}

export default function About() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_stats')
          .select('*');

        if (error) {
          console.error('Error fetching stats:', error);
        } else {
          setStats(data);
        }

      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <section id="about" className="py-32 relative bg-[#fafafa] text-[#171e19]">
      <div className="container mx-auto px-6 md:px-12 max-w-[90rem]">
        
        {/* Split 12-column grid layout for Capabilities/About style */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Left Column (1-4) */}
          <div className="md:col-span-4">
            <h3 className="text-[#9f8d8b] font-heading text-xl uppercase tracking-widest mb-10">Capabilities</h3>
            <ul className="space-y-6">
              {['Frontend Development', 'UI/UX Design', 'Performance Optimization', 'Responsive Interfaces'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group cursor-default">
                  <span className="w-10 h-[1px] bg-[#171e19] group-hover:w-16 transition-all duration-500 ease-fluid"></span>
                  <span className="font-semibold text-sm uppercase tracking-wider">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (5-12) */}
          <div className="md:col-span-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-[#171e19] mb-16"
            >
              I build <i className="text-[#9f8d8b] font-serif">digital experiences</i> that blend brutalist layout structures with fluid, high-tech motion to create <i className="text-[#9f8d8b] font-serif">premium</i> user interfaces.
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#171e19]/10 pt-12">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse h-24 bg-black/5"></div>
                ))
              ) : (
                stats.map((stat) => (
                  <div key={stat.id}>
                    <h3 className="text-4xl md:text-5xl font-heading mb-2 text-[#171e19]">{stat.value}</h3>
                    <p className="text-[#9f8d8b] font-bold text-xs uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}