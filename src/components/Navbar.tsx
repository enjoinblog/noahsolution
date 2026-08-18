import React from 'react';
import { Building2, Globe, Sparkles, Phone, MessageCircle, PlayCircle, Layers } from 'lucide-react';
import { ContactInfo, LanguageMode } from '../types';
import { DEFAULT_CONTACT_INFO } from '../data/videoTimeline';

interface NavbarProps {
  language: LanguageMode;
  onToggleLanguage: () => void;
  onOpenBooking: () => void;
  onOpenPromptStudio: () => void;
  contactInfo?: ContactInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenBooking,
  onOpenPromptStudio,
  contactInfo = DEFAULT_CONTACT_INFO
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-xl border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg border border-amber-300">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-base sm:text-lg font-black text-amber-400 tracking-wider leading-tight">
              {contactInfo.companyName}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium tracking-tight">
              {language === 'bn' ? contactInfo.taglineBn : contactInfo.taglineEn}
            </span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#video-player" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? '১:৫০ মিনিট ভিডিও' : '1:50m Video'}</span>
          </a>
          <a href="#bangla-voiceover-studio" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{language === 'bn' ? 'বাংলা ভয়েসওভার' : 'Bangla Voiceover'}</span>
          </a>
          <a href="#properties" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'bn' ? 'রিসোর্ট ও স্যুইট' : 'Properties'}</span>
          </a>
          <a href="#calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'bn' ? 'রিটার্ন হিসাব' : 'ROI Calculator'}</span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-200 transition-all cursor-pointer"
            title="Switch Language (বাংলা / English)"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* AI Prompt Studio button */}
          <button
            onClick={onOpenPromptStudio}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-xl transition-all shadow cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? 'এআই প্রম্পট' : 'AI Prompt'}</span>
          </button>

          {/* Call & WhatsApp CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{language === 'bn' ? 'ফ্রি সেমিনার বুকিং' : 'Book Seminar'}</span>
            <span className="xs:hidden">{language === 'bn' ? 'বুকিং' : 'Book'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
