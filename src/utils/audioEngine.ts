// Web Audio Synthesizer for luxury corporate ambient music & Enhanced Bangla Voiceover Engine
export interface VoiceInfo {
  name: string;
  lang: string;
  isBengali: boolean;
}

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingBgm: boolean = false;
  private bgmGain: GainNode | null = null;
  private timerId: any = null;
  private chordIndex = 0;
  private availableVoices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSpeaking: boolean = false;
  private listeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.availableVoices = window.speechSynthesis.getVoices();
    // Prioritize Bengali voice
    const bengaliVoice = this.availableVoices.find(
      (v) =>
        v.lang.toLowerCase() === 'bn-bd' ||
        v.lang.toLowerCase() === 'bn-in' ||
        v.lang.toLowerCase().startsWith('bn') ||
        v.name.toLowerCase().includes('bangla') ||
        v.name.toLowerCase().includes('bengali')
    );

    if (bengaliVoice) {
      this.selectedVoice = bengaliVoice;
    }
  }

  public getVoices(): VoiceInfo[] {
    return this.availableVoices.map((v) => ({
      name: v.name,
      lang: v.lang,
      isBengali:
        v.lang.toLowerCase().startsWith('bn') ||
        v.name.toLowerCase().includes('bangla') ||
        v.name.toLowerCase().includes('bengali')
    }));
  }

  public subscribe(listener: (speaking: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(speaking: boolean) {
    this.isSpeaking = speaking;
    this.listeners.forEach((l) => l(speaking));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startBGM(volume = 0.18) {
    try {
      this.initContext();
      if (!this.ctx || this.isPlayingBgm) return;

      this.isPlayingBgm = true;
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      // Chords sequence: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 (warm luxury progression)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // C E G B
        [220.00, 261.63, 329.63, 392.00], // A C E G
        [174.61, 220.00, 261.63, 329.63], // F A C E
        [196.00, 246.94, 293.66, 392.00]  // G B D G
      ];

      const playChord = () => {
        if (!this.isPlayingBgm || !this.ctx || !this.bgmGain) return;
        const currentChord = chords[this.chordIndex % chords.length];
        this.chordIndex++;

        currentChord.forEach((freq, idx) => {
          if (!this.ctx || !this.bgmGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          // Soft ambient envelope
          noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.035 / (idx + 1), this.ctx.currentTime + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);

          osc.connect(noteGain);
          noteGain.connect(this.bgmGain);

          osc.start(this.ctx.currentTime);
          osc.stop(this.ctx.currentTime + 4);
        });

        this.timerId = setTimeout(playChord, 3600);
      };

      playChord();
    } catch (e) {
      console.warn('Audio BGM initialization error:', e);
    }
  }

  public stopBGM() {
    this.isPlayingBgm = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.bgmGain && this.ctx) {
      try {
        this.bgmGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      } catch (e) {
        // ignore
      }
    }
  }

  public setVolume(volume: number) {
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public speak(
    text: string, 
    lang: 'bn-BD' | 'bn-IN' | 'en-US' = 'bn-BD', 
    rate = 0.95,
    onEndCallback?: () => void
  ) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate; // 0.95 for clear natural Bengali articulation
      utterance.pitch = 1.05; // warm, confident female tone
      utterance.lang = lang;

      if (this.availableVoices.length === 0) {
        this.availableVoices = window.speechSynthesis.getVoices();
      }

      // Prioritize strict Bengali voices
      if (lang.startsWith('bn')) {
        const strictBengali = this.availableVoices.find(
          (v) =>
            v.lang.toLowerCase() === 'bn-bd' ||
            v.lang.toLowerCase() === 'bn-in' ||
            v.lang.toLowerCase().startsWith('bn') ||
            v.name.toLowerCase().includes('bangla') ||
            v.name.toLowerCase().includes('bengali')
        );

        if (strictBengali) {
          utterance.voice = strictBengali;
        } else {
          // If no Bengali voice installed on user OS, keep utterance.lang = 'bn-BD'
          utterance.lang = 'bn-BD';
        }
      } else {
        const englishVoice = this.availableVoices.find(
          (v) => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('natural'))
        );
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      utterance.onstart = () => {
        this.notifyListeners(true);
      };

      utterance.onend = () => {
        this.notifyListeners(false);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        this.notifyListeners(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      this.notifyListeners(false);
    }
  }

  public stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notifyListeners(false);
    }
  }
}

export const audioEngine = new AudioEngine();
