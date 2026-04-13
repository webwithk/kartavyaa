import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ExpertiseItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export default function Expertise() {
  const [expertise, setExpertise] = useState<ExpertiseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_expertise')
          .select('*');

        if (error) {
          console.error('Error fetching expertise:', error);
        } else {
          setExpertise(data);
        }
      } catch (err) {
        console.error('Error fetching expertise:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpertise();
  }, []);

  return (
    <section id="expertise" className="py-24 relative bg-slate-900/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Specialized skills and core competencies I bring to every project.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl animate-pulse h-64"></div>
            ))
          ) : (
            expertise.map((item, index) => {
              const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ComponentType<{ size?: number }> || Icons.Code;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-panel p-8 rounded-2xl hover:bg-slate-800/40 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-200">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}