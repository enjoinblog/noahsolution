import React, { useState } from 'react';
import { X, Phone, MessageCircle, Send, CheckCircle2, MapPin, Mail, Sparkles, Building } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactInfo, LanguageMode, PropertyItem } from '../types';
import { DEFAULT_CONTACT_INFO } from '../data/videoTimeline';

interface ContactBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: PropertyItem | null;
  language: LanguageMode;
  contactInfo?: ContactInfo;
}

export const ContactBookingModal: React.FC<ContactBookingModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
  language,
  contactInfo = DEFAULT_CONTACT_INFO
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('Doctor / Engineer / Professional');
  const [investmentBudget, setInvestmentBudget] = useState('10,00,000 BDT (১০ লাখ)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-slate-200">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow">
                N
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-bengali">
                  {language === 'bn' ? 'ফ্রি সেমিনার ও ভিআইপি বুকিং' : 'VIP Consultation & Seminar Pass'}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {selectedProperty 
                    ? (language === 'bn' ? `প্রকল্প: ${selectedProperty.nameBn}` : `Project: ${selectedProperty.nameEn}`)
                    : (language === 'bn' ? 'নোয়াহ বিজনেস সলিউশন - গুলশান হেড অফিস' : 'Noah Business Solution - Gulshan HQ')}
                </p>
              </div>
            </div>

            {/* Quick Instant WhatsApp & Call buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <a
                href={`https://wa.me/88${contactInfo.whatsapp1.replace(/-/g, '')}?text=${encodeURIComponent('Hello Noah Business Solution, I watched the 1:50min promotional video and want information about luxury resort investment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-bold transition-all shadow"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp ১</span>
              </a>

              <a
                href={`tel:${contactInfo.phoneCall.replace(/-/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-amber-300 text-xs font-bold transition-all shadow"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>সরাসরি কল</span>
              </a>
            </div>

            <div className="relative flex py-2 items-center mb-4">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">
                {language === 'bn' ? 'অথবা তথ্য প্রদান করুন' : 'Or Submit Your Details'}
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === 'bn' ? 'আপনার নাম' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bn' ? 'উদা: ড. আহমেদ / ইঞ্জি: রফিক' : 'e.g. Sarah Khan'}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {language === 'bn' ? 'ফোন নম্বর / WhatsApp' : 'Phone Number / WhatsApp'} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'পেশা' : 'Profession'}
                  </label>
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Doctor">Doctor / চিকিৎসক</option>
                    <option value="Engineer">Engineer / প্রকৌশলী</option>
                    <option value="Banker / Corporate">Banker / কর্পোরেট</option>
                    <option value="Business Owner">Business / ব্যবসায়ী</option>
                    <option value="NRB / Expatriate">NRB / প্রবাসী</option>
                    <option value="Govt Official">Govt Official</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {language === 'bn' ? 'বাজেট টার্গেট' : 'Budget Target'}
                  </label>
                  <select
                    value={investmentBudget}
                    onChange={(e) => setInvestmentBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="5,00,000 BDT">৫,০০,০০০ ৳ (৫ লাখ)</option>
                    <option value="10,00,000 BDT">১০,০০,০০০ ৳ (১০ লাখ)</option>
                    <option value="25,00,000 BDT">২৫,০০,০০০ ৳ (২৫ লাখ)</option>
                    <option value="50,00,000+ BDT">৫০,০০,০০০+ ৳ (৫০ লাখ+)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'bn' ? 'ফ্রি সেমিনার সিট কনফার্ম করুন' : 'Confirm Free Seminar Pass'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white font-bengali">
              {language === 'bn' ? 'অভিনন্দন! আপনার স্লট সংরক্ষিত হয়েছে' : 'Congratulations! Your Slot is Reserved'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-bengali leading-relaxed">
              {language === 'bn' 
                ? `ধন্যবাদ ${name}! নোয়াহ বিজনেস সলিউশন এর সিনিয়র ইনভেস্টমেন্ট অ্যাডভাইজার আগামী ৩০ মিনিটের মধ্যে (${phone}) নম্বরে যোগাযোগ করে ফ্রি ইনভেস্টমেন্ট ব্রোশিওর ও দলিল কপি পাঠাবেন।`
                : `Thank you ${name}! Our senior investment advisor will reach out to ${phone} shortly with official brochures and deed copies.`}
            </p>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Building className="w-4 h-4" />
                <span>হেড অফিস ভিজিট অ্যাড্রেস:</span>
              </div>
              <p className="font-bengali">{contactInfo.addressBn}</p>
              <p className="font-mono text-emerald-400 font-bold">হেল্পলাইন: {contactInfo.whatsapp1} / {contactInfo.phoneCall}</p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'বন্ধ করুন' : 'Done'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
