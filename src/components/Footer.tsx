import { MessageCircle, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-800/50 bg-slate-950/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-custom flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-sky-500/20">
              KSP
            </div>
            <span className="font-heading font-semibold text-slate-200">Kartavya Singh Panwar</span>
          </div>
          
          <div className="text-slate-500 text-sm">
            &copy; {currentYear} All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {[
              { icon: Mail, href: 'mailto:kartavyasinghpanwar44@gmail.com' },
              { icon: MessageCircle, href: 'https://wa.me/918209990176' },
              { icon: Instagram, href: 'https://instagram.com/kartavya_panwar.9?igsh=MWFpYzN2MTR5bWVxNg==' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          
        </div>
      </div>
    </footer>
  );
}