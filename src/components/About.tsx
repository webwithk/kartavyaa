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
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
              <p>
                Hello! I'm Kartavya Singh Panwar, a dedicated Web Developer with a strong passion for creating intuitive and dynamic user experiences. Over the past couple of years, I've immersed myself in the world of frontend development.
              </p>
              <p>
                My approach to web development combines clean, maintainable code with modern design principles. I specialize in building component-based architectures that are both scalable and performant. Whether it's a sleek landing page or a complex web application, I bring ideas to life in the browser.
              </p>
              <p>
                When I'm not coding, I'm usually exploring new design trends, contributing to open-source, or optimizing my workflow to deliver the best possible results for my clients.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {loading ? (
              // Skeleton loading
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl animate-pulse h-32"></div>
              ))
            ) : (
              stats.map((stat, index) => (
                <div 
                  key={stat.id} 
                  className={`glass-panel p-6 sm:p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 ${index === stats.length - 1 && stats.length % 2 !== 0 ? 'col-span-2' : ''}`}
                >
                  <h3 className="text-4xl font-bold text-gradient mb-2">{stat.value}</h3>
                  <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
                </div>
              ))
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}