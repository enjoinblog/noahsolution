import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Sliders, FileText, Smartphone, Send, Download } from 'lucide-react';
import { RAW_PROMPT_TEMPLATE, VIDEO_CHAPTERS, DEFAULT_CONTACT_INFO } from '../data/videoTimeline';
import { ContactInfo, LanguageMode } from '../types';

interface PromptStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
  contactInfo?: ContactInfo;
}

export const PromptStudioModal: React.FC<PromptStudioModalProps> = ({
  isOpen,
  onClose,
  language,
  contactInfo = DEFAULT_CONTACT_INFO
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [presenterStyle, setPresenterStyle] = useState<string>('Bengali female presenter in navy corporate suit');
  const [sceneEnvironment, setSceneEnvironment] = useState<string>('Modern luxury office with warm wood accents & sunset bokeh');
  const [resolution, setResolution] = useState<string>('4K UHD 60fps, hyper-realistic cinematic lighting');

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // Full Prompt generation
  const generatedMasterPrompt = `PROMPT FOR AI VIDEO GENERATION (1.50 MIN / 110 SECONDS):
------------------------------------------------------------
Subject & Style:
A sleek, modern promotional video presenter style. A professional ${presenterStyle} standing in a ${sceneEnvironment}, addressing the audience with enthusiasm, warmth, and authority.

Visual Elements & Motion Graphics:
Dynamic 3D visual overlays and motion graphics smoothly pop up around her, showing luxurious beach resort properties, 5-star hotel presidential suites, floating sky swimming pools, and investment ROI growth charts (+14.2% yield). Smooth cinematic visual transitions, bright professional studio lighting, corporate presentation style, ${resolution}, friendly and persuasive tone.

Voiceover & Audio Narration:
Clear Bangla voiceover narrating high-return resort fractional ownership, 30 days annual complimentary luxury stays, and quarterly bank dividends.

Ending Branding & Contact Frame:
Company: ${contactInfo.companyName}
WhatsApp: ${contactInfo.whatsapp1} | Call: ${contactInfo.phoneCall}
Tagline: ${contactInfo.taglineBn}`;

  // Complete 1:50 Voiceover Script
  const fullVoiceoverScript = VIDEO_CHAPTERS.map(
    (ch, idx) => `[Part ${idx + 1}: ${Math.floor(ch.startTime / 60)}:${(ch.startTime % 60).toString().padStart(2, '0')} - ${Math.floor(ch.endTime / 60)}:${(ch.endTime % 60).toString().padStart(2, '0')}] - ${ch.titleBn}
ভয়েসওভার স্ক্রিপ্ট:
"${ch.voiceoverScriptBn}"
মোশন গ্রাফিক্স ওভারলে: [${ch.overlayType.toUpperCase()}] | হাইলাইট: ${ch.highlightMetric?.value} (${ch.highlightMetric?.labelBn})
`
  ).join('\n----------------------------------------\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-5 sm:p-7 my-8 text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-bengali">
                {language === 'bn' ? 'এআই প্রম্পট ও স্ক্রিপ্ট স্টুডিও' : 'AI Video Prompt & Script Studio'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'bn' ? 'HeyGen, Sora, Runway, CapCut এর জন্য সম্পূর্ণ রেডি প্রম্পট' : 'Ready-to-use prompts for HeyGen, Runway, CapCut & AI tools'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customizer Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Presenter Persona</label>
            <input
              type="text"
              value={presenterStyle}
              onChange={(e) => setPresenterStyle(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Studio Environment</label>
            <input
              type="text"
              value={sceneEnvironment}
              onChange={(e) => setSceneEnvironment(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Cinematic Quality</label>
            <input
              type="text"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Prompt Box 1: Master Video Prompt */}
        <div className="mt-5 bg-slate-950 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              ১. AI Video Generator Master Prompt
            </span>
            <button
              onClick={() => handleCopy(generatedMasterPrompt, 'master-prompt')}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow cursor-pointer"
            >
              {copiedSection === 'master-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'master-prompt' ? 'কপি হয়েছে!' : 'Copy Prompt'}</span>
            </button>
          </div>
          <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900/90 p-3 rounded-lg border border-slate-800 overflow-x-auto max-h-48 leading-relaxed">
            {generatedMasterPrompt}
          </pre>
        </div>

        {/* Prompt Box 2: Complete 1.50 Min Voiceover Script */}
        <div className="mt-5 bg-slate-950 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              ২. ১:৫০ মিনিট বাংলা ভয়েসওভার স্ক্রিপ্ট (Voiceover Audio Script)
            </span>
            <button
              onClick={() => handleCopy(fullVoiceoverScript, 'voice-script')}
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow cursor-pointer"
            >
              {copiedSection === 'voice-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'voice-script' ? 'কপি হয়েছে!' : 'Copy Script'}</span>
            </button>
          </div>
          <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900/90 p-3 rounded-lg border border-slate-800 overflow-x-auto max-h-56 leading-relaxed">
            {fullVoiceoverScript}
          </pre>
        </div>

        {/* Prompt Box 3: CapCut Ending Frame & Contact Info */}
        <div className="mt-5 p-4 bg-gradient-to-br from-slate-950 to-emerald-950/40 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              ভিডিওর শেষের ব্র্যান্ডিং ও কন্টাক্ট ফ্রেম (CapCut / Premiere Pro)
            </h4>
            <p className="text-xs text-slate-300">
              WhatsApp: <strong className="text-white font-mono">{contactInfo.whatsapp1}</strong> / <strong className="text-white font-mono">{contactInfo.whatsapp2}</strong> | Direct Call: <strong className="text-white font-mono">{contactInfo.phoneCall}</strong>
            </p>
          </div>
          <button
            onClick={() => handleCopy(`WhatsApp: ${contactInfo.whatsapp1}\nCall: ${contactInfo.phoneCall}\nCompany: ${contactInfo.companyName}`, 'contact-copy')}
            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-all shadow shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            {copiedSection === 'contact-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>কন্টাক্ট টেক্সট কপি</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close Studio'}
          </button>
        </div>
      </div>
    </div>
  );
};
