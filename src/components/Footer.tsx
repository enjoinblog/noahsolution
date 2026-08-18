import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Award, Sparkles, Heart } from 'lucide-react';
import { ContactInfo, LanguageMode } from '../types';
import { DEFAULT_CONTACT_INFO } from '../data/videoTimeline';

interface FooterProps {
  language: LanguageMode;
  onOpenBooking: () => void;
  contactInfo?: ContactInfo;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenBooking,
  contactInfo = DEFAULT_CONTACT_INFO
}) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center font-cinzel">
                N
              </div>
              <span className="font-cinzel text-base font-bold text-white">
                {contactInfo.companyName}
              </span>
            </div>
            <p className="text-slate-400 font-bengali leading-relaxed">
              {language === 'bn' 
                ? 'বাংলাদেশের শীর্ষস্থানীয় লাক্সারি বিচ রিসোর্ট ও ৫-স্টার হোটেল ইনভেস্টমেন্ট ম্যানেজমেন্ট কোম্পানি।'
                : 'Premier luxury beachfront resort & 5-star hotel fractional investment management firm.'}
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>১০০% রেজিস্ট্রিকৃত সাবকবলা মালিকানা</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {language === 'bn' ? 'প্রকল্প ক্যাটাগরি' : 'Project Categories'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Ocean Blue Bay Beach Resort</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Presidential 5-Star Hotel Suites</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Saint Martin Coral Sky Villas</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Dubai Marina Luxury Residence</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Details (From User References) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {language === 'bn' ? 'সরাসরি হেল্পলাইন ও WhatsApp' : 'Direct Helpline & WhatsApp'}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/88${contactInfo.whatsapp1.replace(/-/g, '')}`} className="hover:text-emerald-300 font-mono font-bold text-white">
                  WhatsApp: {contactInfo.whatsapp1}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${contactInfo.phoneCall.replace(/-/g, '')}`} className="hover:text-amber-300 font-mono font-bold text-white">
                  Call & WhatsApp: {contactInfo.whatsapp2}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${contactInfo.phoneCall.replace(/-/g, '')}`} className="hover:text-cyan-300 font-mono text-slate-300">
                  Hotline: {contactInfo.phoneCall}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Office */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {language === 'bn' ? 'হেড অফিস' : 'Head Office'}
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="font-bengali">{language === 'bn' ? contactInfo.addressBn : contactInfo.addressEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-mono">{contactInfo.email}</span>
              </div>
            </div>
            <button
              onClick={onOpenBooking}
              className="mt-3 w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {language === 'bn' ? 'অফিস ভিজিট বুক করুন' : 'Book Office Appointment'}
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 {contactInfo.companyName}. All Rights Reserved. Designed for 1.50 Minute Solo Promotional Video Studio.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Investment</span>
            <span className="hover:text-slate-300 cursor-pointer">Legal Deed Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
