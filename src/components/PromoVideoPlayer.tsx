import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, 
  Sparkles, Smartphone, Monitor, Mic, MicOff, Phone, 
  ChevronRight, Compass, ShieldCheck, TrendingUp, Building, Award, MessageCircle
} from 'lucide-react';
import { VideoChapter, VideoAspectRatio, LanguageMode, ContactInfo, PropertyItem } from '../types';
import { VIDEO_CHAPTERS, DEFAULT_CONTACT_INFO } from '../data/videoTimeline';
import { audioEngine } from '../utils/audioEngine';

interface PromoVideoPlayerProps {
  onOpenBooking: () => void;
  onOpenPromptStudio: () => void;
  onSelectProperty: (property: PropertyItem) => void;
  language: LanguageMode;
  contactInfo?: ContactInfo;
}

export const PromoVideoPlayer: React.FC<PromoVideoPlayerProps> = ({
  onOpenBooking,
  onOpenPromptStudio,
  language,
  contactInfo = DEFAULT_CONTACT_INFO
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('16:9');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState<boolean>(true);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalDuration = 110; // 1.50 minutes = 110 seconds

  // Current active chapter
  const currentChapter = VIDEO_CHAPTERS.find(
    (ch) => currentTime >= ch.startTime && currentTime < ch.endTime
  ) || VIDEO_CHAPTERS[VIDEO_CHAPTERS.length - 1];

  // Presenter visual assets
  const presenterImages = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80', // professional corporate presenter
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
  ];

  // Timer loop for video playback
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= totalDuration) {
            setIsPlaying(false);
            audioEngine.stopBGM();
            audioEngine.stopSpeech();
            return totalDuration;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Handle Speech and BGM on chapter change
  const lastChapterIdRef = useRef<string>('');
  useEffect(() => {
    if (isPlaying) {
      if (!isMuted) {
        audioEngine.startBGM(0.2);
      }
      if (isVoiceoverEnabled && currentChapter.id !== lastChapterIdRef.current) {
        lastChapterIdRef.current = currentChapter.id;
        const speechText = language === 'bn' ? currentChapter.voiceoverScriptBn : currentChapter.voiceoverScriptEn;
        const langCode = language === 'bn' ? 'bn-BD' : 'en-US';
        audioEngine.speak(speechText, langCode, playbackSpeed);
      }
    } else {
      audioEngine.stopSpeech();
    }
  }, [isPlaying, currentChapter.id, isVoiceoverEnabled, isMuted, language, playbackSpeed]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= totalDuration) {
        setCurrentTime(0);
      }
      setIsPlaying(true);
      if (!isMuted) audioEngine.startBGM(0.2);
      if (isVoiceoverEnabled) {
        const speechText = language === 'bn' ? currentChapter.voiceoverScriptBn : currentChapter.voiceoverScriptEn;
        audioEngine.speak(speechText, language === 'bn' ? 'bn-BD' : 'en-US', playbackSpeed);
      }
    } else {
      setIsPlaying(false);
      audioEngine.stopBGM();
      audioEngine.stopSpeech();
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.max(0, Math.min(totalDuration, newTime)));
    if (isPlaying && isVoiceoverEnabled) {
      audioEngine.stopSpeech();
      const targetChapter = VIDEO_CHAPTERS.find(ch => newTime >= ch.startTime && newTime < ch.endTime) || VIDEO_CHAPTERS[0];
      const speechText = language === 'bn' ? targetChapter.voiceoverScriptBn : targetChapter.voiceoverScriptEn;
      audioEngine.speak(speechText, language === 'bn' ? 'bn-BD' : 'en-US', playbackSpeed);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (isPlaying) audioEngine.startBGM(0.2);
    } else {
      setIsMuted(true);
      audioEngine.stopBGM();
    }
  };

  const toggleVoiceover = () => {
    if (isVoiceoverEnabled) {
      setIsVoiceoverEnabled(false);
      audioEngine.stopSpeech();
    } else {
      setIsVoiceoverEnabled(true);
      if (isPlaying) {
        const speechText = language === 'bn' ? currentChapter.voiceoverScriptBn : currentChapter.voiceoverScriptEn;
        audioEngine.speak(speechText, language === 'bn' ? 'bn-BD' : 'en-US', playbackSpeed);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Bar Switchers & Live Badge */}
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 px-4 py-2 mb-2 bg-slate-900/80 rounded-xl border border-slate-800 text-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-red-500/20 border border-red-500/40 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-red-400 font-bold text-xs tracking-wider uppercase">
              {language === 'bn' ? 'সোলো প্রোমোশনাল ভিডিও (১:৫০ মিনিট)' : 'Solo Promotional Video (1:50 Min)'}
            </span>
          </div>
          <span className="text-slate-400 text-xs hidden sm:inline">
            {language === 'bn' ? '৪K সিনেমাটিক প্রেজেন্টার স্টাইল' : '4K Cinematic Presenter Style'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Aspect ratio buttons */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              id="btn-aspect-16-9"
              onClick={() => setAspectRatio('16:9')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                aspectRatio === '16:9' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Landscape Desktop/TV (16:9)"
            >
              <Monitor className="w-3.5 h-3.5" />
              16:9
            </button>
            <button
              id="btn-aspect-9-16"
              onClick={() => setAspectRatio('9:16')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                aspectRatio === '9:16' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
              }`}
              title="Mobile Reels / TikTok / WhatsApp (9:16)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              9:16 Reels
            </button>
          </div>

          {/* AI Prompt Studio button */}
          <button
            id="btn-open-prompt-studio"
            onClick={onOpenPromptStudio}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn' ? 'এআই প্রম্পট ও স্ক্রিপ্ট' : 'AI Prompt Studio'}
          </button>
        </div>
      </div>

      {/* Main Video Viewport Canvas */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl bg-slate-950 border border-amber-500/20 shadow-2xl transition-all duration-500 ${
          aspectRatio === '16:9' 
            ? 'w-full max-w-6xl aspect-[16/9] max-h-[640px]' 
            : 'w-full max-w-[420px] aspect-[9/16] max-h-[720px]'
        }`}
      >
        {/* Background Ambient Luxury Light / WebGL waves */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#071326] to-[#0d2244] z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Presenter & B-Roll Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          {/* Presenter Image with gentle zoom & breath animation */}
          <motion.div 
            className="relative w-full h-full"
            key={currentChapter.id}
            initial={{ opacity: 0.85, scale: 1 }}
            animate={{ 
              opacity: 1, 
              scale: isPlaying ? [1, 1.025, 1] : 1,
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img 
              src={presenterImages[0]}
              alt="Sarah Islam - Professional Bengali Female Presenter" 
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Cinematic Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/50"></div>
          </motion.div>

          {/* Dynamic Audio Visualizer wave near mic when playing */}
          {isPlaying && (
            <div className="absolute top-6 left-6 flex items-center gap-1 px-2.5 py-1 bg-slate-900/70 backdrop-blur-md rounded-full border border-slate-700/50 z-30">
              <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1.5 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              <span className="w-1.5 h-4 bg-amber-400 rounded-full animate-bounce [animation-delay:0.45s]"></span>
              <span className="text-[10px] text-amber-300 font-bold ml-1">AUDIO SYNC</span>
            </div>
          )}
        </div>

        {/* Dynamic Motion Graphics Overlays (Sync with Chapter Timestamps) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-6 md:p-8">
          {/* Top Info Header */}
          <div className="flex items-start justify-between">
            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/30 shadow-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-base shadow">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-amber-400 font-bold text-xs sm:text-sm tracking-wider leading-none">
                  {contactInfo.companyName}
                </span>
                <span className="text-[10px] text-slate-300 font-medium tracking-tight">
                  {language === 'bn' ? contactInfo.taglineBn : contactInfo.taglineEn}
                </span>
              </div>
            </div>

            {/* Current Chapter Badge */}
            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {language === 'bn' ? currentChapter.badgeBn : currentChapter.badgeEn}
              </span>
              <span className="text-[11px] text-slate-300 bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-md">
                {formatTime(currentTime)} / 01:50
              </span>
            </div>
          </div>

          {/* Dynamic Center/Right Floating 3D Cards */}
          <div className="w-full flex-1 flex flex-col justify-center my-auto">
            <AnimatePresence mode="wait">
              {/* Overlay 1: Hook & Question (0:00 - 0:22) */}
              {currentChapter.overlayType === 'hook' && (
                <motion.div
                  key="hook-overlay"
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md bg-slate-900/85 backdrop-blur-xl border border-amber-500/40 p-5 rounded-2xl shadow-2xl pointer-events-auto"
                >
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'bn' ? 'আপনি কি ইনভেস্টমেন্ট করতে চান?' : 'Looking For High-Yield Investment?'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 font-bengali">
                    {language === 'bn' ? currentChapter.titleBn : currentChapter.titleEn}
                  </h2>
                  <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 font-cinzel leading-none">
                        {currentChapter.highlightMetric?.value}
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">
                        {language === 'bn' ? currentChapter.highlightMetric?.labelBn : currentChapter.highlightMetric?.labelEn}
                      </div>
                    </div>
                    <button
                      onClick={onOpenBooking}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow cursor-pointer flex items-center gap-1"
                    >
                      {language === 'bn' ? 'অফার দেখুন' : 'View Offer'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Overlay 2: Resort Showcase (0:22 - 0:46) */}
              {currentChapter.overlayType === 'resort_showcase' && (
                <motion.div
                  key="resort-overlay"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="self-end max-w-sm sm:max-w-md bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                >
                  <div className="relative h-32 sm:h-40 w-full overflow-hidden">
                    <img 
                      src={currentChapter.featuredImage} 
                      alt="Luxury Resort" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-2 right-2 bg-cyan-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      {language === 'bn' ? 'মেরিন ড্রাইভ লোকেশন' : 'Prime Beachfront'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base sm:text-lg font-bold text-white font-bengali">
                      {language === 'bn' ? 'আন্তর্জাতিক মানের বিচ রিসোর্ট ও প্রাইভেট ভিলা' : 'World-Class Beachfront Resort & Villas'}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-amber-400 font-bold">
                        {language === 'bn' ? '৩০ দিন ফ্রি স্টে + রেজিস্ট্রিকৃত দলিল' : '30 Days Free Stay + Deed'}
                      </span>
                      <span className="text-xs px-2 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded font-mono">
                        {currentChapter.highlightMetric?.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Overlay 3: 5-Star Suite & Amenities (0:46 - 0:70) */}
              {currentChapter.overlayType === 'suite_features' && (
                <motion.div
                  key="suite-overlay"
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="self-end max-w-sm bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 p-4 rounded-2xl shadow-2xl pointer-events-auto"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={currentChapter.featuredImage} 
                      alt="5 Star Suite" 
                      className="w-16 h-16 rounded-xl object-cover border border-amber-500/40 shadow"
                    />
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                        {language === 'bn' ? '৫-স্টার সুযোগ-সুবিধা' : '5-Star Hospitality'}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {language === 'bn' ? 'স্মার্ট অটোমেশন ও ইনফিনিটি পুল' : 'Smart Automation & Sky Pool'}
                      </h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                      <div className="text-amber-400 font-bold font-cinzel text-base">৮৮%+</div>
                      <div className="text-[10px] text-slate-300">{language === 'bn' ? 'অকুপেন্সি রেট' : 'Occupancy Rate'}</div>
                    </div>
                    <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                      <div className="text-cyan-400 font-bold font-cinzel text-base">৩ মাস পর পর</div>
                      <div className="text-[10px] text-slate-300">{language === 'bn' ? 'মুনাফা উত্তোলন' : 'Payout Period'}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Overlay 4: ROI Growth Chart (0:70 - 0:92) */}
              {currentChapter.overlayType === 'roi_growth' && (
                <motion.div
                  key="roi-overlay"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 p-4 sm:p-5 rounded-2xl shadow-2xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 uppercase">
                        {language === 'bn' ? 'ক্যাপিটাল গ্রোথ প্রজেকশন' : 'Capital Growth Projection'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-300 font-mono">+৪৮% (৫ বছর)</span>
                  </div>
                  {/* Mini Animated Sparkline Chart */}
                  <div className="h-20 w-full bg-slate-950/60 rounded-xl p-2 flex items-end justify-between gap-1.5 border border-slate-800">
                    {[25, 40, 55, 70, 95].map((height, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="w-full bg-gradient-to-t from-emerald-600 to-amber-400 rounded-t-md"
                        />
                        <span className="text-[9px] text-slate-400">Y{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-300">
                    <span>{language === 'bn' ? '১০০+ সফল বিনিয়োগকারী' : '100+ Happy Investors'}</span>
                    <span className="text-amber-400 font-bold">{language === 'bn' ? '১০০% ব্যাংক গ্যারান্টি' : '100% Secure'}</span>
                  </div>
                </motion.div>
              )}

              {/* Overlay 5: Final Call to Action & Contact Numbers (0:92 - 1:50) */}
              {currentChapter.overlayType === 'cta_contacts' && (
                <motion.div
                  key="cta-overlay"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md mx-auto bg-slate-900/95 backdrop-blur-2xl border-2 border-amber-400 p-5 rounded-2xl shadow-2xl text-center pointer-events-auto"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'আজই বুক করুন - সীমিত স্লট' : 'Limited Slots - Book Today'}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-bengali">
                    {language === 'bn' ? 'ফ্রি সেমিনার ও রেজিস্ট্রেশন করতে কল করুন' : 'Call or WhatsApp For VIP Seminar Pass'}
                  </h3>

                  {/* Highlighted Phone Numbers from user's assets */}
                  <div className="space-y-2 mb-4">
                    <a
                      href={`https://wa.me/88${contactInfo.whatsapp1.replace(/-/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>WhatsApp (Primary):</span>
                      </div>
                      <span className="font-mono text-sm text-white font-bold">{contactInfo.whatsapp1}</span>
                    </a>

                    <a
                      href={`tel:${contactInfo.phoneCall.replace(/-/g, '')}`}
                      className="flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-amber-300 text-xs font-bold transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-amber-400" />
                        <span>Call & WhatsApp:</span>
                      </div>
                      <span className="font-mono text-sm text-white font-bold">{contactInfo.whatsapp2}</span>
                    </a>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
                  >
                    {language === 'bn' ? 'ফ্রি ইনভেস্টমেন্ট ক্যাটালগ ডাউনলোড' : 'Book Free Consultation'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitles & Lower Third Presenter Name Tag */}
          <div className="flex flex-col gap-2">
            {/* Bengali/English Subtitle Bar */}
            {showSubtitles && (
              <div className="w-full bg-slate-950/85 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-xl text-center shadow-lg">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-amber-200 font-bengali leading-relaxed">
                  {language === 'bn' ? currentChapter.voiceoverScriptBn : currentChapter.voiceoverScriptEn}
                </p>
              </div>
            )}

            {/* Presenter Name Tag */}
            <div className="flex items-center justify-between bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-8 bg-amber-500 rounded-full"></div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-bengali">
                    {language === 'bn' ? 'সারা ইসলাম (Sarah Islam)' : 'Sarah Islam'}
                  </h4>
                  <p className="text-[10px] text-amber-400 tracking-wider uppercase font-medium">
                    {language === 'bn' ? 'ডিরেক্টর অফ ইনভেস্টমেন্টস, নোয়াহ বিজনেস সলিউশন' : 'Director of Investments, Noah Business Solution'}
                  </p>
                </div>
              </div>

              {/* Fast CTA */}
              <button
                onClick={onOpenBooking}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                <Phone className="w-3 h-3" />
                <span>{contactInfo.phoneCall}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Play/Pause Big overlay when paused */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 z-30 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.5)] group-hover:shadow-[0_0_70px_rgba(245,158,11,0.8)] transition-all"
            >
              <Play className="w-10 h-10 ml-1.5 fill-current" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="w-full max-w-6xl mt-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl text-slate-200">
        {/* Scrubber / Progress Bar */}
        <div className="flex flex-col gap-1 mb-3">
          <div className="relative w-full h-2.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              handleSeek(clickPos * totalDuration);
            }}
          >
            {/* Buffer bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
            {/* Chapter markers */}
            {VIDEO_CHAPTERS.map((ch) => (
              <div
                key={ch.id}
                className="absolute top-0 bottom-0 w-0.5 bg-slate-950/70"
                style={{ left: `${(ch.startTime / totalDuration) * 100}%` }}
                title={ch.titleBn}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span className="text-amber-400 font-medium text-[11px]">
              {language === 'bn' ? currentChapter.titleBn : currentChapter.titleEn}
            </span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Play, Pause, Replay, Seek Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="btn-play-pause"
              onClick={togglePlay}
              className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-all shadow-md cursor-pointer font-bold"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>

            <button
              id="btn-restart"
              onClick={() => handleSeek(0)}
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              title="Restart from 0:00"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Skip 5s backward & forward */}
            <button
              onClick={() => handleSeek(currentTime - 5)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer font-mono"
            >
              -5s
            </button>
            <button
              onClick={() => handleSeek(currentTime + 5)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer font-mono"
            >
              +5s
            </button>

            {/* Audio Voiceover Toggle */}
            <button
              id="btn-toggle-voiceover"
              onClick={toggleVoiceover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isVoiceoverEnabled 
                  ? 'bg-gradient-to-r from-amber-500/30 to-amber-500/10 text-amber-300 border border-amber-500/50 shadow-sm' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="বাংলা এআই ভয়েসওভার ন্যারেশন চালু/বন্ধ করুন"
            >
              {isVoiceoverEnabled ? <Mic className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <MicOff className="w-3.5 h-3.5" />}
              <span>{isVoiceoverEnabled ? '🇧🇩 বাংলা ভয়েসওভার' : 'ভয়েস বন্ধ'}</span>
            </button>

            {/* Ambient BGM Toggle */}
            <button
              id="btn-toggle-bgm"
              onClick={toggleMute}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !isMuted ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="Luxury Ambient Background Music"
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{language === 'bn' ? 'মিউজিক' : 'BGM'}</span>
            </button>
          </div>

          {/* Chapter Quick Jumps */}
          <div className="hidden lg:flex items-center gap-1">
            {VIDEO_CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => handleSeek(ch.startTime)}
                className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                  currentChapter.id === ch.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                Part {idx + 1}
              </button>
            ))}
          </div>

          {/* Right Extras: Speed, Subtitles, Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-amber-500"
            >
              <option value={0.75}>0.75x</option>
              <option value={1}>1.0x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>

            {/* Subtitle toggle */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                showSubtitles ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
              }`}
              title="Toggle Subtitles"
            >
              CC
            </button>

            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
