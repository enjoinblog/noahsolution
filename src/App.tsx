import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, TrendingUp, Gift, PlayCircle, Phone, 
  MessageCircle, Building2, CheckCircle2, ChevronRight, Award, 
  MapPin, Star, Video, FileText, ArrowRight
} from 'lucide-react';
import { LanguageMode, PropertyItem, ContactInfo } from './types';
import { DEFAULT_CONTACT_INFO } from './data/videoTimeline';
import { Navbar } from './components/Navbar';
import { PromoVideoPlayer } from './components/PromoVideoPlayer';
import { BanglaVoiceoverStudio } from './components/BanglaVoiceoverStudio';
import { PropertyGallery } from './components/PropertyGallery';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { ContactBookingModal } from './components/ContactBookingModal';
import { PromptStudioModal } from './components/PromptStudioModal';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<LanguageMode>('bn');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isPromptStudioOpen, setIsPromptStudioOpen] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [contactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleSelectProperty = (property: PropertyItem) => {
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenBooking={() => {
          setSelectedProperty(null);
          setIsBookingOpen(true);
        }}
        onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        contactInfo={contactInfo}
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Header */}
        <section className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? 'এক্সক্লুসিভ হসপিটালিটি ইনভেস্টমেন্ট' : 'Exclusive Hospitality Investment'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-bengali leading-tight max-w-4xl mx-auto">
            {language === 'bn' ? (
              <>
                আপনার পেশার পাশাপাশি <br className="hidden sm:inline" />
                <span className="text-gold-gradient">নিশ্চিত প্যাসিভ ইনকাম</span> ও লাক্সারি রিসোর্ট মালিকানা
              </>
            ) : (
              <>
                Smart Passive Income & <br className="hidden sm:inline" />
                <span className="text-gold-gradient">Luxury Resort Ownership</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto font-bengali leading-relaxed">
            {language === 'bn'
              ? '১.৫০ মিনিটের সোলো ভিডিও প্রেজেন্টারে দেখুন আন্তর্জাতিক মানের বিচ রিসোর্ট, ৫-স্টার স্যুইট, ভাসমান ইনফিনিটি পুল এবং বাৎসরিক ১৪.২%+ নিশ্চিত রিটার্নের বিস্তারিত সুযোগ।'
              : 'Watch our 1:50 min solo presenter video exploring beachfront resorts, 5-star presidential suites, sky infinity pools, and 14.2%+ guaranteed annual yields.'}
          </p>
        </section>

        {/* 1.50 Minute Promotional Video Player Studio */}
        <section id="video-player" className="w-full max-w-6xl mx-auto px-4 py-4">
          <PromoVideoPlayer
            language={language}
            onOpenBooking={() => {
              setSelectedProperty(null);
              setIsBookingOpen(true);
            }}
            onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
            onSelectProperty={handleSelectProperty}
            contactInfo={contactInfo}
          />
        </section>

        {/* 1:50 Minute Bangla Voiceover Audio Studio & Script Audition */}
        <BanglaVoiceoverStudio
          language={language}
          contactInfo={contactInfo}
          onOpenBooking={() => {
            setSelectedProperty(null);
            setIsBookingOpen(true);
          }}
          onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        />

        {/* 4 Pillars of Value Bento Section */}
        <section className="w-full max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1 */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-bengali">
                  {language === 'bn' ? '১৪.২%+ বাৎসরিক রিটার্ন' : '14.2%+ Annual Yield'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-bengali">
                  {language === 'bn' ? 'প্রতি ৩ মাস পর পর সরাসরি আপনার ব্যাংক অ্যাকাউন্টে মুনাফা পেআউট।' : 'Quarterly direct bank dividend payout.'}
                </p>
              </div>
              <span className="text-[11px] text-amber-400 font-mono mt-3 font-semibold">Quarterly Payout</span>
            </div>

            {/* Box 2 */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-bengali">
                  {language === 'bn' ? '৩০ দিন ফ্রি ফ্যামিলি স্টে' : '30 Days Free Stay'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-bengali">
                  {language === 'bn' ? 'প্রতি বছর পরিবারসহ ৫-স্টার বিচ রিসোর্টে প্রিমিয়াম হলিডে সুবিধা।' : 'Complimentary annual luxury vacations for your entire family.'}
                </p>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono mt-3 font-semibold">VIP Hospitality</span>
            </div>

            {/* Box 3 */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-bengali">
                  {language === 'bn' ? 'রেজিস্ট্রিকৃত সাবকবলা দলিল' : 'Registered Sub-Kabla Deed'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-bengali">
                  {language === 'bn' ? 'আইনগত শতভাগ নিরাপদ, হস্তান্তরযোগ্য ও উত্তরাধিকার সূত্রে প্রাপ্ত মালিকানা।' : '100% legal ownership, transferable & hereditary deed.'}
                </p>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono mt-3 font-semibold">100% Legal Deed</span>
            </div>

            {/* Box 4 */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-bengali">
                  {language === 'bn' ? 'জিরো ম্যানেজমেন্ট ঝামেলা' : 'Zero Management Hassle'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-bengali">
                  {language === 'bn' ? 'আন্তর্জাতিক ব্র্যান্ড অপারেটর দ্বারা রক্ষণাবেক্ষণ ও বুকিং ম্যানেজমেন্ট।' : 'Managed fully by professional international hospitality chains.'}
                </p>
              </div>
              <span className="text-[11px] text-purple-400 font-mono mt-3 font-semibold">Fully Managed</span>
            </div>
          </div>
        </section>

        {/* Featured Property Catalog Gallery */}
        <PropertyGallery
          language={language}
          onSelectProperty={handleSelectProperty}
        />

        {/* Interactive Investment ROI Calculator */}
        <InvestmentCalculator
          language={language}
          onOpenBooking={() => {
            setSelectedProperty(null);
            setIsBookingOpen(true);
          }}
        />

        {/* Fast Action WhatsApp / Call Banner */}
        <section className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/20 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-md uppercase tracking-wider">
                {language === 'bn' ? 'সীমিত সংখ্যক স্যুইট বাকি' : 'Limited Phase 1 Suites Left'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-bengali">
                {language === 'bn' ? 'আজই আমাদের গুলশান হেড অফিসে ফ্রি কনসালটেশন নিন' : 'Book a Private Consultation at Gulshan HQ'}
              </h3>
              <p className="text-xs text-slate-300 font-bengali">
                {language === 'bn' ? 'WhatsApp এ মেসেজ পাঠান অথবা সরাসরি ফোন করে আপনার ফ্রি সেমিনার পাস সংগ্রহ করুন।' : 'Message us on WhatsApp or call directly to get your VIP invitation.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/88${contactInfo.whatsapp1.replace(/-/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {contactInfo.whatsapp1}</span>
              </a>

              <button
                onClick={() => {
                  setSelectedProperty(null);
                  setIsBookingOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'bn' ? 'ফ্রি সেমিনার সিট বুকিং' : 'Register Now'}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenBooking={() => {
          setSelectedProperty(null);
          setIsBookingOpen(true);
        }}
        contactInfo={contactInfo}
      />

      {/* Modals */}
      <ContactBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedProperty={selectedProperty}
        language={language}
        contactInfo={contactInfo}
      />

      <PromptStudioModal
        isOpen={isPromptStudioOpen}
        onClose={() => setIsPromptStudioOpen(false)}
        language={language}
        contactInfo={contactInfo}
      />
    </div>
  );
}
