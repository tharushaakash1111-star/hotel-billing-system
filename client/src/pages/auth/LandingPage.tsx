import React, { useState } from 'react';
import { LoginModal } from './LoginModal';

export const LandingPage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-20 z-50 backdrop-blur-md bg-white/60 border-b border-[#c4c6cf]/20">
        <div className="container mx-auto h-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#00152f] flex items-center justify-center text-white font-headline-sm font-bold shadow-lg">
              SN
            </div>
            <span className="font-headline-sm text-[#00152f] font-bold text-xl tracking-wide hidden sm:block">
              SkyNest Hotels
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-label-md font-label-md text-[#43474e]">
            <a href="#" className="hover:text-[#00152f] transition-colors">Our Story</a>
            <a href="#" className="hover:text-[#00152f] transition-colors">Experiences</a>
            <a href="#" className="hover:text-[#00152f] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col w-full">
        <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrz7adGWbj29H2Ytvdhi4_9Xfj0Wbrq569O9E7zHWrDzKtvhYkcGKNEl69-q8m2O3sVA4XLOoJOwJGvrYwxDEldy0ZH-pNUlqf-sWYqB05pr7BpjsxoiNlSF3MktKtTtNPUN8h5sWW0tiPTeol1R5Vw8XMcM9m7M-Rpcym3hfWRa8RsVjMznOpAXT5fIrU-tceOjOPIbj0DsEwMfV0jRaf-XNNCvbJqalAtAA7zDswmXs-i3-3YPzThUgbxoUg-lVf0vo1aTILBhrX"
              alt="SkyNest Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00152f]/40 via-transparent to-[#00152f]/80 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20">
            <h1 className="font-display-lg font-display-lg-mobile text-white mb-8 drop-shadow-2xl">
              WELCOME TO<br />
              <span className="text-5xl md:text-7xl font-bold">HOTEL SKYNEST</span>
            </h1>

            <button
              onClick={() => setIsLoginOpen(true)}
              className="group relative px-8 py-4 bg-[#00152f] text-white rounded-full font-label-md shadow-[0_8px_30px_rgb(0,21,47,0.3)] hover:shadow-[0_8px_40px_rgb(0,21,47,0.5)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 w-0 group-hover:w-full transition-all duration-300 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2 tracking-widest font-semibold text-sm">
                MANAGEMENT PORTAL
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* Sub-headline & Branches Section */}
        <section className="py-24 bg-[#f9f9ff] w-full relative -mt-8 rounded-t-[3rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto max-w-container-max px-6 text-center">
            <h2 className="font-body-lg text-[#43474e] tracking-[0.2em] uppercase mb-16 max-w-2xl mx-auto leading-relaxed text-sm font-semibold">
              Dedicated to providing the highest level of comfort and serenity across Sri Lanka.
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {['COLOMBO', 'KANDY', 'GALLE'].map((city) => (
                <button
                  key={city}
                  onClick={() => setIsLoginOpen(true)}
                  className="px-8 py-3 rounded-full border border-[#c4c6cf] text-[#111c2c] bg-[#f9f9ff] hover:bg-[#e7eeff] hover:border-[#00152f]/30 transition-all duration-300 font-headline-sm text-lg shadow-sm font-bold"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f0f3ff] py-12 border-t border-[#c4c6cf]/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00152f]/10 flex items-center justify-center text-[#00152f] font-headline-sm font-bold text-sm">
              SN
            </div>
            <span className="font-label-md text-[#43474e] text-sm">
              © 2024 SkyNest Hotels. All rights reserved.
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="font-label-sm text-[#43474e] uppercase tracking-widest text-xs font-semibold">
              Contact Us
            </span>
            <div className="flex gap-4 text-[#43474e]">
              <span className="material-symbols-outlined cursor-pointer hover:text-[#00152f]">call</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-[#00152f]">mail</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};
