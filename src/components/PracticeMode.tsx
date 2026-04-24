import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, RotateCcw, SkipForward, Check, X, Delete, Send } from 'lucide-react';
import { MORSE_MAP, playMorseSound } from '../utils/morse';
import { Translations } from '../types';

interface PracticeHistory {
  char: string;
  code: string;
  isCorrect: boolean;
  timestamp: number;
}

interface PracticeModeProps {
  translations: Translations;
  lang: string;
  onBack: () => void;
}

export default function PracticeMode({ translations, lang, onBack }: PracticeModeProps) {
  const [currentChallenge, setCurrentChallenge] = useState<{ char: string; code: string } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<PracticeHistory[]>([]);

  const generateChallenge = useCallback(() => {
    const letters = Object.entries(MORSE_MAP).filter(([char]) => {
      if (char === ' ') return false;
      const isGeorgian = /[ა-ჰ]/.test(char);
      const isLatin = /[A-Z]/.test(char);
      const isNumber = /[0-9]/.test(char);
      
      if (lang === 'ka') return isGeorgian || isNumber;
      return isLatin || isNumber;
    });

    const random = letters[Math.floor(Math.random() * letters.length)];
    setCurrentChallenge({ char: random[0], code: random[1] });
    setUserInput('');
    setStatus('idle');
  }, [lang]);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  useEffect(() => {
    if (currentChallenge) {
      playMorseSound(currentChallenge.code);
    }
  }, [currentChallenge]);

  const handleSubmit = () => {
    if (!currentChallenge) return;
    
    const isCorrect = userInput === currentChallenge.code;
    
    const newHistory: PracticeHistory = {
      char: currentChallenge.char,
      code: currentChallenge.code,
      isCorrect,
      timestamp: Date.now()
    };

    setHistory(prev => [newHistory, ...prev].slice(0, 10));

    if (isCorrect) {
      setStatus('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        generateChallenge();
      }, 1000);
    } else {
      setStatus('incorrect');
      setTimeout(() => setStatus('idle'), 1000);
    }
  };

  const handleInput = (symbol: '.' | '-') => {
    if (status !== 'idle') return;
    setUserInput(prev => prev + symbol);
    playMorseSound(symbol);
  };

  const handleClear = () => {
    setUserInput('');
  };

  if (!currentChallenge) return null;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-3 gap-3 overflow-hidden">
      {/* Score Header */}
      <div className="flex justify-between items-center px-1 shrink-0">
        <button 
          onClick={onBack}
          className="text-[10px] font-black text-text-secondary uppercase tracking-[2px] active:text-primary transition-colors"
        >
          ← {lang === 'ka' ? 'უკან' : 'Atrás'}
        </button>
        <div className="bg-primary/20 text-primary px-3 py-0.5 rounded-full text-[10px] font-black border border-primary/20">
          SCORE: {score}
        </div>
      </div>

      {/* Challenge Card - Compact */}
      <motion.div 
        key={currentChallenge.char}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="h-40 flex flex-col items-center justify-center bg-surface-light rounded-2xl border-2 border-white/5 shadow-2xl relative overflow-hidden shrink-0"
      >
        <AnimatePresence mode="wait">
          {status === 'idle' ? (
            <motion.div 
              key="char"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-6xl font-black text-text-primary mb-2"
            >
              {currentChallenge.char}
            </motion.div>
          ) : status === 'correct' ? (
            <motion.div 
              key="correct"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center text-green-500"
            >
              <Check size={48} strokeWidth={3} />
              <span className="font-bold uppercase tracking-widest text-[10px] mt-2">{translations.practice.correct}</span>
            </motion.div>
          ) : (
            <motion.div 
              key="incorrect"
              initial={{ x: -10 }}
              animate={{ x: [0, -5, 5, -5, 5, 0] }}
              className="flex flex-col items-center text-red-500"
            >
              <X size={48} strokeWidth={3} />
              <span className="font-bold uppercase tracking-widest text-[10px] mt-2">{translations.practice.incorrect}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <button 
            onClick={() => playMorseSound(currentChallenge.code)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary transition-all"
          >
            <RotateCcw size={14} />
          </button>
          <button 
            onClick={generateChallenge}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary transition-all"
          >
            <SkipForward size={14} />
          </button>
        </div>
      </motion.div>

      {/* User Input Display - Compact */}
      <div className="h-12 flex items-center justify-center bg-black/40 rounded-xl border border-white/5 shadow-inner px-4 overflow-hidden shrink-0">
        <div className="text-2xl font-mono font-black text-primary tracking-[6px]">
          {userInput || (
            <span className="text-[10px] opacity-20 tracking-normal font-sans uppercase">
              {lang === 'ka' ? 'აკრიფეთ კოდი' : 'Escribe el código'}
            </span>
          )}
        </div>
      </div>

      {/* Morse Controls - Compact */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => handleInput('.')}
            disabled={status !== 'idle'}
            className="h-16 flex items-center justify-center bg-surface-light rounded-xl border border-white/5 active:bg-primary active:text-black transition-all shadow-lg text-4xl font-black group"
          >
            <div className="w-3 h-3 rounded-full bg-current" />
          </button>
          <button 
            onClick={() => handleInput('-')}
            disabled={status !== 'idle'}
            className="h-16 flex items-center justify-center bg-surface-light rounded-xl border border-white/5 active:bg-primary active:text-black transition-all shadow-lg text-4xl font-black group"
          >
            <div className="w-10 h-3 rounded-full bg-current" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleClear}
            disabled={status !== 'idle'}
            className="h-12 flex items-center justify-center bg-surface-light rounded-lg border border-white/5 active:bg-red-500/20 text-text-secondary active:text-red-500 transition-all font-bold uppercase tracking-widest text-[10px] gap-2"
          >
            <Delete size={14} />
            {translations.clear}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={status !== 'idle' || !userInput}
            className="h-12 flex items-center justify-center bg-primary text-background rounded-lg active:brightness-110 active:scale-95 transition-all font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg"
          >
            <Send size={14} />
            {translations.practice.submit}
          </button>
        </div>
      </div>

      {/* History Table - Scrollable within remaining space */}
      <div className="flex-1 min-h-0 flex flex-col bg-surface-light/30 rounded-xl border border-white/5 overflow-hidden">
        <div className="p-2 border-b border-white/5 bg-black/20 flex justify-between items-center shrink-0">
          <span className="text-[8px] font-black text-text-secondary uppercase tracking-[2px]">
            {lang === 'ka' ? 'ისტორია' : 'Historial'}
          </span>
          <span className="text-[8px] font-black text-text-secondary uppercase tracking-[2px]">
            {lang === 'ka' ? 'ქულა' : 'Puntos'}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {history.length === 0 ? (
            <div className="h-full flex items-center justify-center opacity-20 text-[10px] uppercase font-bold italic">
              No attempts yet
            </div>
          ) : (
            history.map((record) => (
              <div 
                key={record.timestamp} 
                className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-primary w-4">{record.char}</span>
                  <span className="text-xs font-mono font-bold text-text-secondary tracking-widest">{record.code}</span>
                </div>
                <div className={`text-[10px] font-black ${record.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                  {record.isCorrect ? '1' : '0'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
