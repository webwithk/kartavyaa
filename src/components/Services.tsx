import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Service {
  id: number;
  recommended?: boolean;
  tier: string;
  price: string;
  features: string[];
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_services')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching services:', error);
        } else {
          setServices(data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 relative bg-slate-900/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Services & <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Flexible packages tailored to meet your specific project needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-panel rounded-2xl animate-pulse h-[400px]"></div>
            ))
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative glass-panel rounded-2xl p-8 flex flex-col h-full ${
                  service.recommended 
                    ? 'border-sky-500/50 shadow-[0_0_30px_rgba(56,189,248,0.15)] transform md:-translate-y-4' 
                    : 'border-slate-800/50'
                }`}
              >
                {service.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-custom text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-200 mb-2">{service.tier}</h3>
                <div className="mb-6">
                  <span className="text-2xl font-bold text-white">{service.price}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <Check size={18} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact"
                  className={`w-full py-3 rounded-xl font-medium text-center transition-all ${
                    service.recommended
                      ? 'bg-gradient-custom text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  Choose {service.tier}
                </a>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}