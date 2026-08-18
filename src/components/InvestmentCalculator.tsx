import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ShieldCheck, Gift, Check, ArrowRight } from 'lucide-react';
import { LanguageMode } from '../types';

interface InvestmentCalculatorProps {
  onOpenBooking: () => void;
  language: LanguageMode;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  onOpenBooking,
  language
}) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000); // 10 Lakh BDT
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  const rate = currency === 'BDT' ? 1 : 120;
  const annualRoiPercent = 14.5;
  const capitalGrowthPercent = 48.0;

  const annualDividend = Math.round(investmentAmount * (annualRoiPercent / 100));
  const monthlyDividend = Math.round(annualDividend / 12);
  const fiveYearCapitalGain = Math.round(investmentAmount * (1 + capitalGrowthPercent / 100));
  const freeStayNights = Math.min(30, Math.max(10, Math.floor(investmentAmount / 100000) * 2));

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'bn' ? 'bn-BD' : 'en-US').format(num);
  };

  return (
    <section id="calculator" className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 rounded-3xl border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            {language === 'bn' ? 'স্মার্ট রিটার্ন ক্যালকুলেটর' : 'Interactive ROI Calculator'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-bengali">
            {language === 'bn' ? 'আপনার বিনিয়োগের লাভ ও সুবিধা হিসাব করুন' : 'Calculate Your Returns & Perks'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-bengali">
            {language === 'bn'
              ? 'বাৎসরিক ১৪.৫% পর্যন্ত নিশ্চিত ক্যাশ ডিভিডেন্ড ও ৫ বছরে মূলধনের বৃদ্ধি'
              : 'Up to 14.5% annual cash dividend payout + 5-year capital appreciation'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Input Slider Controls */}
          <div className="lg:col-span-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200">
                {language === 'bn' ? 'বিনিয়োগের পরিমাণ' : 'Investment Amount'}
              </label>
              <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => setCurrency('BDT')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    currency === 'BDT' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  BDT (৳)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    currency === 'USD' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Big Display Amount */}
            <div className="p-4 bg-slate-900 rounded-xl border border-amber-500/30 text-center">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-cinzel">
                {currency === 'BDT' ? '৳ ' : '$ '}
                {formatNumber(currency === 'BDT' ? investmentAmount : Math.round(investmentAmount / 120))}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'bn' ? 'লাইফটাইম ফ্র্যাকশনাল শেয়ার ও সাবকবলা রেজিস্ট্রি' : 'Lifetime registered deed fractional unit'}
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="500000"
                max="5000000"
                step="100000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>৫ লাখ ৳</span>
                <span>২৫ লাখ ৳</span>
                <span>৫০ লাখ ৳</span>
              </div>
            </div>

            {/* Fast Preset buttons */}
            <div className="grid grid-cols-3 gap-2">
              {[500000, 1000000, 2500000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setInvestmentAmount(amt)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    investmentAmount === amt
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {currency === 'BDT' ? `৳ ${amt / 100000} লাখ` : `$ ${Math.round(amt / 120)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Output Breakdown Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Annual ROI */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{language === 'bn' ? 'বাৎসরিক ক্যাশ পেআউট' : 'Annual Cash Payout'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-cinzel">
                  {currency === 'BDT' ? '৳ ' : '$ '}
                  {formatNumber(currency === 'BDT' ? annualDividend : Math.round(annualDividend / 120))}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {language === 'bn' ? `প্রতি মাসে প্রায় ৳ ${formatNumber(monthlyDividend)}` : `Approx $ ${formatNumber(Math.round(monthlyDividend / 120))}/mo`}
                </div>
              </div>

              {/* Card 2: 5-Year Capital Value */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'bn' ? '৫ বছরে প্রজেক্টেড সম্পদ মান' : '5-Year Asset Value (+48%)'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-cinzel">
                  {currency === 'BDT' ? '৳ ' : '$ '}
                  {formatNumber(currency === 'BDT' ? fiveYearCapitalGain : Math.round(fiveYearCapitalGain / 120))}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {language === 'bn' ? 'মূলধন বৃদ্ধি ও ল্যান্ড ভ্যালু প্রবৃদ্ধি' : 'Compound land & unit appreciation'}
                </div>
              </div>
            </div>

            {/* Card 3: Free Stay & Perks */}
            <div className="p-5 bg-gradient-to-r from-slate-950 to-amber-950/40 rounded-2xl border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    {language === 'bn' ? 'লাইফটাইম হলিডে প্যাকেজ' : 'Lifetime Holiday Package'}
                  </div>
                  <div className="text-base font-bold text-white">
                    {language === 'bn' ? `প্রতি বছর ${freeStayNights} দিন সম্পূর্ণ ফ্রি ফ্যামিলি স্টে!` : `${freeStayNights} Days Complimentary Luxury Stay / Year!`}
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{language === 'bn' ? 'স্লট নিশ্চিত করুন' : 'Lock This Slot'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
