import React, { useState, useEffect } from 'react';
import { 
  Mic, Play, Pause, Volume2, Sparkles, Copy, Check, 
  RotateCcw, Sliders, Radio, Headphones, FileText, CheckCircle2, ChevronRight, Phone, MessageCircle 
} from 'lucide-react';
import { VIDEO_CHAPTERS, DEFAULT_CONTACT_INFO } from '../data/videoTimeline';
import { LanguageMode, ContactInfo } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface BanglaVoiceoverStudioProps {
  language: LanguageMode;
  contactInfo?: ContactInfo;
  onOpenBooking: () => void;
  onOpenPromptStudio: () => void;
}

export const BanglaVoiceoverStudio: React.FC<BanglaVoiceoverStudioProps> = ({
  language,
  contactInfo = DEFAULT_CONTACT_INFO,
  onOpenBooking,
  onOpenPromptStudio
}) => {
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [voiceTone, setVoiceTone] = useState<'female_corporate' | 'natural_story'>('female_corporate');

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((speaking) => {
      setIsSpeakingAudio(speaking);
      if (!speaking && activePlayingIndex !== null) {
        // finished
      }
    });
    return () => unsubscribe();
  }, [activePlayingIndex]);

  const handlePlayChapterAudio = (index: number) => {
    const chapter = VIDEO_CHAPTERS[index];
    if (activePlayingIndex === index && isSpeakingAudio) {
      audioEngine.stopSpeech();
      setActivePlayingIndex(null);
    } else {
      setActivePlayingIndex(index);
      audioEngine.speak(chapter.voiceoverScriptBn, 'bn-BD', speechRate, () => {
        setActivePlayingIndex(null);
      });
    }
  };

  const handlePlayFullBanglaVoiceover = () => {
    if (isSpeakingAudio) {
      audioEngine.stopSpeech();
      setActivePlayingIndex(null);
      return;
    }

    // Play sequentially from Chapter 1
    let currentIdx = 0;
    const playNext = () => {
      if (currentIdx >= VIDEO_CHAPTERS.length) {
        setActivePlayingIndex(null);
        return;
      }
      setActivePlayingIndex(currentIdx);
      const script = VIDEO_CHAPTERS[currentIdx].voiceoverScriptBn;
      currentIdx++;
      audioEngine.speak(script, 'bn-BD', speechRate, () => {
        setTimeout(playNext, 600);
      });
    };

    playNext();
  };

  const handleCopyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="bangla-voiceover-studio" className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Container */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-[#091e3a] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? 'অফিশিয়াল বাংলা ভয়েসওভার স্টুডিও' : 'Official Bangla Voiceover Studio'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-bengali">
              ১:৫০ মিনিট বাংলা ভয়েসওভার ও অডিও ন্যারেশন
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-bengali max-w-2xl">
              ভিডিওর প্রতিটি অধ্যায়ের প্রফেশনাল বাংলা স্ক্রিপ্ট শুনুন, ভয়েস রেট ও পিচ নিয়ন্ত্রণ করুন এবং AI ভিডিও মেকার (HeyGen, ElevenLabs, CapCut) এ ব্যবহারের জন্য এক ক্লিকে কপি করুন।
            </p>
          </div>

          {/* Master Full Play Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handlePlayFullBanglaVoiceover}
              className={`px-5 py-3.5 rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSpeakingAudio
                  ? 'bg-red-500 hover:bg-red-400 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
              }`}
            >
              {isSpeakingAudio ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>ভয়েসওভার বন্ধ করুন</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>সম্পূর্ণ বাংলা ভয়েসওভার শুনুন (১:৫০ মিনিট)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Voice Active Visualizer Bar */}
        {isSpeakingAudio && (
          <div className="mt-4 p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-4 bg-amber-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-6 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.45s]"></span>
              </div>
              <span className="text-xs font-bold text-amber-300 font-bengali">
                {activePlayingIndex !== null 
                  ? `অধ্যায় ${activePlayingIndex + 1} (${VIDEO_CHAPTERS[activePlayingIndex].titleBn}) এর বাংলা ভয়েসওভার চলছে...` 
                  : 'বাংলা অডিও ন্যারেশন চলছে...'}
              </span>
            </div>
            <button
              onClick={() => audioEngine.stopSpeech()}
              className="text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1 bg-red-950/60 rounded border border-red-500/40 cursor-pointer"
            >
              থামান
            </button>
          </div>
        )}

        {/* Speed Controls & Voice Settings */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Headphones className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">ভয়েস স্টাইল:</span>
              <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-amber-300 font-bold border border-slate-700">
                বাংলা কর্পোরেট ফিমেল (Sarah Islam)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">কথার গতি (Speed):</span>
            {[0.85, 0.95, 1.1, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  speechRate === rate
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Chapter-by-Chapter Voiceover Grid */}
        <div className="mt-6 space-y-4">
          {VIDEO_CHAPTERS.map((chapter, idx) => {
            const isPlayingThis = activePlayingIndex === idx && isSpeakingAudio;
            return (
              <div
                key={chapter.id}
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isPlayingThis
                    ? 'bg-slate-900 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
                    : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-slate-700">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-bengali">
                        {chapter.titleBn}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        টাইমস্ট্যাম্প: {Math.floor(chapter.startTime / 60)}:{(chapter.startTime % 60).toString().padStart(2, '0')} - {Math.floor(chapter.endTime / 60)}:{(chapter.endTime % 60).toString().padStart(2, '0')} মিনিট ({chapter.endTime - chapter.startTime} সেকেন্ড)
                      </span>
                    </div>
                  </div>

                  {/* Audio Controls for this Chapter */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayChapterAudio(idx)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow cursor-pointer ${
                        isPlayingThis
                          ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                          : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                      }`}
                    >
                      {isPlayingThis ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      <span>{isPlayingThis ? 'ভয়েস থামান' : 'বাংলায় শুনুন'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyScript(chapter.voiceoverScriptBn, chapter.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
                      title="স্ক্রিপ্ট কপি করুন"
                    >
                      {copiedId === chapter.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{copiedId === chapter.id ? 'কপি হয়েছে' : 'কপি'}</span>
                    </button>
                  </div>
                </div>

                {/* Bengali Voiceover Prose Box */}
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800/80">
                  <p className="text-xs sm:text-sm text-amber-200/90 font-bengali leading-relaxed">
                    "{chapter.voiceoverScriptBn}"
                  </p>
                </div>

                {/* Visual Cue metadata */}
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-semibold">মোশন গ্রাফিক্স:</span>
                    <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">{chapter.overlayType.toUpperCase()}</span>
                  </div>
                  {chapter.highlightMetric && (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span>হাইলাইট:</span>
                      <strong className="text-white font-cinzel">{chapter.highlightMetric.value}</strong>
                      <span>({chapter.highlightMetric.labelBn})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Footer inside Voiceover Section */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-bengali">
            💡 <strong>টিপস:</strong> আপনি যদি ElevenLabs বা HeyGen এ ভয়েসওভার জেনারেট করতে চান, তবে উপরের স্ক্রিপ্ট কপি করে "Bangla (Bangladesh)" ভাষা সিলেক্ট করুন।
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPromptStudio}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>সম্পূর্ণ এআই প্রম্পট ফাইল</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>ফ্রি কনসালটেশন</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
