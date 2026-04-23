export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-32 pb-12 bg-[#171e19] text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-[90rem]">
        
        <div className="mb-32">
          <h2 className="text-[15vw] leading-[0.8] font-heading tracking-tighter uppercase mb-8">
            LET'S CREATE
          </h2>
          <a href="mailto:kartavyasinghpanwar44@gmail.com" className="text-4xl md:text-6xl font-heading text-[#b7c6c2] hover:text-white transition-colors underline underline-offset-8 decoration-2">
            HELLO@KARTAVYA.DEV
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8 border-t border-white/10">
          
          <div className="text-white/50 text-[10px] font-bold tracking-widest uppercase">
            &copy; {currentYear} KARTAVYA SINGH PANWAR. ALL RIGHTS RESERVED.
          </div>
          
        </div>
      </div>
    </footer>
  );
}