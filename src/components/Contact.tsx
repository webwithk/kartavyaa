import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null as string | null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });
    
    try {
      const { error } = await supabase
        .from('portfolio_messages')
        .insert([{ ...formData }]);
      
      if (error) {
        throw new Error(error.message);
      }

          
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (err) {
      setStatus({ submitting: false, success: false, error: (err as Error).message });
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-[#fafafa] text-[#171e19]">
      <div className="container mx-auto px-6 md:px-12 max-w-[90rem]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h2 className="text-6xl md:text-8xl font-heading tracking-tighter mb-8 leading-none uppercase">
              LET'S START A PROJECT
            </h2>
            <p className="text-[#9f8d8b] font-medium text-lg mb-12 max-w-md">
              I'm currently available for freelance work. If you have a project that needs some creative magic, I'd love to hear about it.
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#9f8d8b] mb-2">Email</p>
                <a href="mailto:kartavyasinghpanwar44@gmail.com" className="text-xl font-semibold hover:text-[#b7c6c2] transition-colors">kartavyasinghpanwar44@gmail.com</a>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#9f8d8b] mb-2">Socials</p>
                <div className="flex gap-6">
                  <a href="mailto:kartavyasinghpanwar44@gmail.com" className="text-sm font-bold tracking-widest uppercase hover:text-[#b7c6c2] transition-colors">Mail</a>
                  <a href="https://wa.me/918209990176" className="text-sm font-bold tracking-widest uppercase hover:text-[#b7c6c2] transition-colors">Whatsapp</a>
                  <a href="https://www.instagram.com/kartavya_panwar.9?igsh=MWFpYzN2MTR5bWVxNg==" className="text-sm font-bold tracking-widest uppercase hover:text-[#b7c6c2] transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 md:p-16 border border-[#171e19]/10">
              <div>
                <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase text-[#9f8d8b] mb-4">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#171e19]/20 pb-4 text-[#171e19] placeholder-[#171e19]/30 focus:outline-none focus:border-[#171e19] transition-all font-medium text-lg"
                  placeholder="What's your name?"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-[#9f8d8b] mb-4">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#171e19]/20 pb-4 text-[#171e19] placeholder-[#171e19]/30 focus:outline-none focus:border-[#171e19] transition-all font-medium text-lg"
                  placeholder="Your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-bold tracking-widest uppercase text-[#9f8d8b] mb-4">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#171e19]/20 pb-4 text-[#171e19] placeholder-[#171e19]/30 focus:outline-none focus:border-[#171e19] transition-all font-medium text-lg resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-6 bg-[#171e19] text-white font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#302b2f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-8"
              >
                {status.submitting ? 'Sending...' : (
                  <>Send Message <Send size={20} strokeWidth={1.5} /></>
                )}
              </button>
              
              {status.success && (
                <p className="text-green-600 text-sm font-bold tracking-wider uppercase text-center mt-6">Message sent successfully!</p>
              )}
              {status.error && (
                <p className="text-red-600 text-sm font-bold tracking-wider uppercase text-center mt-6">Failed to send message.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}