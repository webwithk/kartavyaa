import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <section id="services" className="py-32 relative bg-[#171e19] overflow-hidden border-t border-white/5">
      {/* Deep Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#7c3aed] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-heading tracking-tighter mb-6 leading-none text-white"
          >
            SERVICES & PRICING
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[90rem] mx-auto">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="border border-white/10 animate-pulse h-[500px] bg-white/5"></div>
            ))
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-10 flex flex-col h-full border transition-all duration-500 ${
                  service.recommended 
                    ? 'bg-white text-[#111111] border-white scale-105 z-10' 
                    : 'bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {service.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#171e19] text-white text-xs font-bold px-6 py-2 tracking-[0.2em] uppercase border border-white/20">
                    RECOMMENDED
                  </div>
                )}
                
                <h3 className={`text-3xl font-heading uppercase tracking-wide mb-6 ${service.recommended ? 'text-[#111111]' : 'text-[#b7c6c2]'}`}>
                  {service.tier}
                </h3>
                <div className="mb-10 pb-10 border-b border-current opacity-20">
                  <span className={`text-2xl font-bold ${service.recommended ? 'text-[#111111]' : 'text-white'}`}>
                    {service.price}
                  </span>
                </div>
                
                <ul className="space-y-5 mb-12 flex-grow">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className={`text-sm font-medium tracking-wide ${service.recommended ? 'text-[#333333]' : 'text-[#9f8d8b]'}`}>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="#contact"
                  className={`w-full py-5 font-bold tracking-widest text-center uppercase transition-all ${
                    service.recommended
                      ? 'bg-[#171e19] text-white hover:bg-black'
                      : 'border border-white/20 hover:bg-white hover:text-[#171e19]'
                  }`}
                >
                  Select Plan
                </a>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}