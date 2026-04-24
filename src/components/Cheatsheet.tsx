import { motion } from 'motion/react';
import { MORSE_MAP } from '../utils/morse';
import { X } from 'lucide-react';

interface CheatsheetProps {
  onClose: () => void;
  translations: any;
  lang: string;
}

export default function Cheatsheet({ onClose, translations, lang }: CheatsheetProps) {
  const items = Object.entries(MORSE_MAP).filter(([char]) => {
    if (char === ' ') return false;
    
    // Strict language filtering for cheatsheet
    const isGeorgian = /[ა-ჰ]/.test(char);
    const isLatin = /[a-zA-Z]/.test(char);
    const isNumber = /[0-9]/.test(char);

    if (lang === 'ka') {
      return isGeorgian || isNumber;
    } else {
      return isLatin || isNumber;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md p-6 overflow-y-auto"
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-background/50 py-2">
          <h2 className="text-xl font-bold tracking-tighter text-primary uppercase">{translations.cheatsheet}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-surface-light border border-white/10 text-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map(([char, code]) => (
            <div key={char} className="flex items-center justify-between p-3 bg-surface-light rounded-lg border border-white/5">
              <span className="text-xl font-black font-mono text-text-primary">{char}</span>
              <span className="text-lg font-mono text-primary font-bold">{code}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 py-4 bg-primary text-background font-black rounded-lg uppercase tracking-widest"
        >
          {translations.close}
        </button>
      </div>
    </motion.div>
  );
}
