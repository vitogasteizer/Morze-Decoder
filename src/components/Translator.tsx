import { useState } from 'react';
import { motion } from 'motion/react';
import { textToMorse, morseToText, playMorseSound } from '../utils/morse';
import { THEME } from '../constants/theme';
import { ArrowRightLeft, Copy, Volume2 } from 'lucide-react';

interface TranslatorProps {
  translations: any;
  lang: string;
}

export default function Translator({ translations, lang }: TranslatorProps) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTextToMorse, setIsTextToMorse] = useState(true);

  const handleConvert = () => {
    if (isTextToMorse) {
      setOutputText(textToMorse(inputText));
    } else {
      setOutputText(morseToText(inputText, lang));
    }
  };

  const handleSwap = () => {
    setIsTextToMorse(!isTextToMorse);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handlePlay = () => {
    const morseToPlay = isTextToMorse ? outputText : inputText;
    playMorseSound(morseToPlay);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto p-4 sm:p-6 bg-surface-light rounded-lg border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[2px]">Source</span>
          <h3 className="text-xs font-black text-primary uppercase">
            {isTextToMorse ? 'TEXT' : 'MORSE'}
          </h3>
        </div>
        
        <button 
          onClick={handleSwap}
          className="w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-primary hover:scale-110 active:scale-95 transition-all shadow-lg"
        >
          <ArrowRightLeft size={16} />
        </button>

        <div className="flex flex-col text-right">
          <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[2px]">Target</span>
          <h3 className="text-xs font-black text-primary uppercase">
            {!isTextToMorse ? 'TEXT' : 'MORSE'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
           <textarea
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder={translations.inputPlaceholder}
             className="w-full h-24 p-4 bg-black/40 rounded-lg border border-white/5 text-text-primary font-mono focus:border-primary outline-none resize-none transition-all text-sm shadow-inner"
           />
        </div>

        <div className="flex flex-col gap-1.5 relative group">
           <div className="w-full h-24 p-4 bg-black/60 rounded-lg border border-white/5 text-primary font-mono overflow-auto break-all text-sm shadow-inner">
             {outputText || <span className="opacity-10 italic text-[10px]">{translations.outputPlaceholder}</span>}
           </div>
           
           <div className="absolute top-2 right-2 flex gap-1.5">
             {outputText && (
               <>
                 <button onClick={handleCopy} className="p-1.5 bg-surface rounded-md text-text-secondary hover:text-primary transition-colors border border-white/5">
                   <Copy size={12} />
                 </button>
                 <button onClick={handlePlay} className="p-1.5 bg-surface rounded-md text-text-secondary hover:text-primary transition-colors border border-white/5">
                   <Volume2 size={12} />
                 </button>
               </>
             )}
           </div>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="w-full py-4 bg-primary text-background font-black rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg text-sm uppercase tracking-[2px]"
      >
        {isTextToMorse ? translations.convertToMorse : translations.convertToText}
      </button>
    </div>
  );
}
