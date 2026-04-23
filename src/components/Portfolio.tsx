import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface Project {
  id: number;
  image_url: string;
  title: string;
  description: string;
  tags: string[];
  demo_url?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.error('Error fetching projects:', error);
        } else {
          setProjects(data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-32 relative bg-[#ffffff] text-[#171e19]">
      <div className="container mx-auto px-6 md:px-12 max-w-[90rem]">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-9xl font-heading tracking-tighter leading-none text-[#171e19]"
          >
            SELECTED WORKS
          </motion.h2>
        </div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className={`animate-pulse bg-black/5 aspect-[3/4] ${i % 2 !== 0 ? 'md:mt-16' : ''}`}></div>
            ))
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
                onClick={() => {
                  if (project.demo_url) window.open(project.demo_url, '_blank');
                }}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-[#f5f5f5] mb-6">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-110"
                  />
                  
                  {/* Hover Reveal Viewport */}
                  <div className="absolute inset-0 bg-[#171e19]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-fluid flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-fluid delay-100">
                      <span className="font-heading text-[#171e19] text-sm tracking-widest">VIEW</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-heading tracking-wide mb-2 uppercase">{project.title}</h3>
                    <div className="flex gap-3">
                      {project.tags.slice(0, 2).map((tag: string, i: number) => (
                        <span key={i} className="text-xs font-semibold tracking-widest uppercase text-[#9f8d8b]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}