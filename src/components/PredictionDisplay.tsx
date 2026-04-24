import { motion, AnimatePresence } from 'motion/react';
import { MORSE_MAP } from '../utils/morse';

interface PredictionDisplayProps {
  currentPath: string;
  onSelect: (char: string) => void;
  lang?: string;
}

export default function PredictionDisplay({ currentPath, onSelect, lang }: PredictionDisplayProps) {
  // Filter MORSE_MAP for symbols that start with the currentPath
  const predictions = Object.entries(MORSE_MAP)
    .filter(([char, code]) => {
      if (char === ' ' || char === '/') return false;
      if (!code.startsWith(currentPath)) return false;

      // Strict language filtering
      const isGeorgian = /[ა-ჰ]/.test(char);
      const isLatin = /[a-zA-Z]/.test(char);
      const isNumber = /[0-9]/.test(char);

      if (lang === 'ka') {
        // In Georgian mode, show Georgian and numbers
        return isGeorgian || isNumber;
      } else {
        // In Spanish/Latin mode, show Latin and numbers
        return isLatin || isNumber;
      }
    })
    .sort((a, b) => {
      // Prioritize exact match
      const aExact = a[1] === currentPath;
      const bExact = b[1] === currentPath;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then by length
      if (a[1].length !== b[1].length) return a[1].length - b[1].length;
      
      // Then alphabetically
      return a[0].localeCompare(b[0]);
    });

  if (currentPath === '') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <p className="text-text-primary text-[10px] font-black uppercase tracking-[3px] mb-1">
          Awaiting Signal
        </p>
        <p className="text-text-secondary text-[8px] opacity-40 uppercase tracking-widest max-w-[150px]">
          TAP TO SEE SUGGESTIONS
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <AnimatePresence mode="popLayout">
        {predictions.slice(0, 21).map(([char, code]) => {
          const isExactMatch = code === currentPath;
          const isGeorgian = /[ა-ჰ]/.test(char);
          
          return (
            <motion.button
              key={`${lang}-${char}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => onSelect(char)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all cursor-pointer group relative active:scale-95
                ${isExactMatch 
                  ? 'bg-primary border-white shadow-[0_10px_25px_rgba(255,215,0,0.3)] z-10' 
                  : 'bg-surface border-white/5 hover:border-primary/30'}
              `}
            >
              <span className={`text-2xl xs:text-4xl font-black font-mono transition-all ${isExactMatch ? 'text-black' : isGeorgian ? 'text-primary' : 'text-text-primary'}`}>
                {char}
              </span>
              <div className={`mt-2 px-2.5 py-1 rounded-lg border flex items-center justify-center transition-all ${
                isExactMatch 
                  ? 'bg-black/10 border-black/20' 
                  : 'bg-black/30 border-white/5 group-hover:border-primary/50'
              }`}>
                <span className={`text-[12px] xs:text-sm font-black font-mono tracking-[1px] ${
                  isExactMatch ? 'text-black' : 'text-primary animate-pulse'
                }`}>
                  {code}
                </span>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
      {predictions.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-10 opacity-30">
          <p className="text-secondary text-xs font-black uppercase tracking-[2px]">NO MATCH</p>
        </div>
      )}
    </div>
  );
}
