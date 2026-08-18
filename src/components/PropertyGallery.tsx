import React, { useState } from 'react';
import { Building2, Sparkles, MapPin, CheckCircle2, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { PropertyItem, LanguageMode } from '../types';
import { PROPERTIES_DATA } from '../data/videoTimeline';

interface PropertyGalleryProps {
  onSelectProperty: (property: PropertyItem) => void;
  language: LanguageMode;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  onSelectProperty,
  language
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'resort' | 'suite' | 'villa' | 'hotel'>('all');

  const filteredProperties = activeCategory === 'all' 
    ? PROPERTIES_DATA 
    : PROPERTIES_DATA.filter(p => p.category === activeCategory);

  return (
    <section id="properties" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn' ? 'ফিচার্ড প্রজেক্টসমূহ' : 'Featured Luxury Projects'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-bengali">
            {language === 'bn' ? 'লাক্সারি বিচ রিসোর্ট ও ৫-স্টার হোটেল পোর্টফোলিও' : 'Luxury Beach Resorts & 5-Star Hotel Portfolio'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl font-bengali">
            {language === 'bn' 
              ? 'নিরাপদ সাবকবলা রেজিস্ট্রিকৃত মালিকানা, সর্বোচ্চ বাৎসরিক ডিভিডেন্ড এবং লাইফটাইম ফ্রি ফ্যামিলি ভ্যাকেশন সুবিধা।' 
              : 'Registered deed ownership, guaranteed annual dividends, and lifetime complimentary luxury holidays.'}
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto">
          {[
            { id: 'all', labelBn: 'সকল প্রজেক্ট', labelEn: 'All Projects' },
            { id: 'resort', labelBn: 'বিচ রিসোর্ট', labelEn: 'Beach Resorts' },
            { id: 'suite', labelBn: '৫-স্টার স্যুইট', labelEn: '5-Star Suites' },
            { id: 'villa', labelBn: 'ইনফিনিটি ভিলা', labelEn: 'Sky Villas' },
            { id: 'hotel', labelBn: 'আন্তর্জাতিক', labelEn: 'Global Hotels' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="group relative bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Banner */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={property.image}
                alt={property.nameEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 rounded-lg text-xs font-bold">
                  {property.annualRoi}
                </span>
                <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-medium">
                  {property.occupancyRate} {language === 'bn' ? 'অকুপেন্সি' : 'Occupancy'}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1 text-slate-300 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'bn' ? property.locationBn : property.locationEn}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-bengali mt-0.5">
                    {language === 'bn' ? property.nameBn : property.nameEn}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content & Features */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-300 mb-4 leading-relaxed font-bengali">
                {language === 'bn' ? property.descriptionBn : property.descriptionEn}
              </p>

              {/* Feature Tags */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {(language === 'bn' ? property.featuresBn : property.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {language === 'bn' ? 'ইনভেস্টমেন্ট শুরু' : 'Starting From'}
                  </div>
                  <div className="text-lg font-bold text-amber-400 font-cinzel">
                    {property.priceStart}
                  </div>
                </div>

                <button
                  onClick={() => onSelectProperty(property)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'বিস্তারিত ও বুকিং' : 'Book Inquiry'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
