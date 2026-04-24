import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { THEME } from '../constants/theme';
import { playMorseSound, initAudio } from '../utils/morse';
import { Volume2, Delete, Radio } from 'lucide-react';

interface MorseInputProps {
  onCodeChange: (code: string) => void;
  currentCode: string;
  onBackspace: () => void;
  translations: any;
}

export default function MorseInput({ onCodeChange, currentCode, onBackspace, translations }: MorseInputProps) {
  const [isPressing, setIsPressing] = useState(false);
  const pressStartTime = useRef<number>(0);

  const isHandlingRef = useRef(false);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'touchstart') isHandlingRef.current = true;
    if (e.type === 'mousedown' && isHandlingRef.current) return;

    e.preventDefault();
    initAudio();
    setIsPressing(true);
    pressStartTime.current = Date.now();
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'mouseup' || e.type === 'mouseleave') isHandlingRef.current = false;
    if (!isPressing) return;
    
    setIsPressing(false);
    const duration = Date.now() - pressStartTime.current;
    
    // Adjusted thresholds: Dot is < 160ms, Dash is >= 160ms
    const symbol = duration < 160 ? '.' : '-';
    
    onCodeChange(currentCode + symbol);
    playMorseSound(symbol);
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-surface-light rounded-lg border border-white/5 shadow-lg relative bg-gradient-to-br from-white/5 to-transparent">
      {/* Visual Feedback LED */}
      <div className="flex flex-col items-center gap-1 shrink-0 px-2">
        <div 
          className={`w-2.5 h-2.5 rounded-full transition-all duration-75 ${
            isPressing 
              ? 'bg-primary shadow-[0_0_12px_var(--color-primary)]' 
              : 'bg-white/5'
          }`}
        />
        <span className="text-[7px] font-black text-text-secondary uppercase tracking-[1px]">On</span>
      </div>

      {/* The Key Button - Compact */}
      <div className="relative">
        <motion.button
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          whileTap={{ scale: 0.92 }}
          className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 transition-transform active:scale-90"
          style={{ 
            background: 'linear-gradient(145deg, #252a33, #1a1e25)',
            border: '4px solid #15181e',
            boxShadow: isPressing 
              ? 'inset 3px 3px 6px #0e1115, inset -3px -3px 6px #202631' 
              : '6px 6px 12px #0e1115, -6px -6px 12px #202631'
          }}
        >
           <Radio size={24} className={isPressing ? 'text-primary' : 'text-text-secondary opacity-20'} />
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{translations.tapButton}</span>
          <button 
            onClick={onBackspace}
            className="text-secondary p-1 active:scale-90 transition-transform"
            title="Backspace"
          >
            <Delete size={14} />
          </button>
        </div>
        
        {/* Signal Buffer Inside Input */}
        <div className="bg-black/40 rounded-lg h-8 flex items-center px-3 border border-white/5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <div className="flex gap-1">
              {currentCode.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-black font-mono text-primary leading-none"
                >
                  {char === '.' ? '●' : '⚊'}
                </motion.span>
              ))}
              {currentCode === '' && (
                 <span className="text-[8px] font-black opacity-20 uppercase tracking-widest">Listening...</span>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
