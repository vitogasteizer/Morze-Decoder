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

  const handleConvert = (text: string) => {
    setInputText(text);
    if (isTextToMorse) {
      setOutputText(textToMorse(text));
    } else {
      setOutputText(morseToText(text, lang));
    }
  };

  const handleSwap = () => {
    setIsTextToMorse(!isTextToMorse);
    const newIn = outputText;
    const newOut = inputText;
    setInputText(newIn);
    setOutputText(newOut);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handlePlay = () => {
    const morseToPlay = isTextToMorse ? outputText : inputText;
    playMorseSound(morseToPlay);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full max-w-xl mx-auto overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between px-2 shrink-0">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[2px]">Source</span>
          <h3 className="text-xs font-black text-primary uppercase">
            {isTextToMorse ? 'TEXT' : 'MORSE'}
          </h3>
        </div>
        
        <button 
          onClick={handleSwap}
          className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary hover:scale-110 active:scale-95 transition-all shadow-lg"
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

      {/* Inputs List */}
      <div className="flex-1 min-h-0 flex flex-col gap-4 overflow-hidden">
        {/* Input Card */}
        <div className="flex-[3] flex flex-col bg-surface-light rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="p-2 border-b border-white/5 bg-black/20 shrink-0">
            <span className="text-[8px] font-black text-text-secondary uppercase tracking-[2px]">Input Area</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => handleConvert(e.target.value)}
            placeholder={translations.inputPlaceholder}
            className="flex-1 w-full p-4 bg-transparent text-text-primary font-mono focus:text-primary outline-none resize-none transition-all text-lg shadow-inner custom-scrollbar"
          />
        </div>

        {/* Output Card */}
        <div className="flex-[4] flex flex-col bg-surface-light rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="p-2 border-b border-white/5 bg-black/20 flex justify-between items-center shrink-0">
            <span className="text-[8px] font-black text-text-secondary uppercase tracking-[2px]">Translation</span>
            <div className="flex gap-1.5">
              {outputText && (
                <>
                  <button onClick={handleCopy} className="p-1.5 bg-surface-light border border-white/10 rounded-md text-text-secondary hover:text-primary transition-colors">
                    <Copy size={12} />
                  </button>
                  <button onClick={handlePlay} className="p-1.5 bg-surface-light border border-white/10 rounded-md text-text-secondary hover:text-primary transition-colors">
                    <Volume2 size={12} />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 w-full p-4 bg-black/20 text-primary font-mono overflow-y-auto break-all text-xl shadow-inner custom-scrollbar leading-relaxed">
            {outputText || (
              <span className="opacity-10 italic text-sm tracking-widest font-sans uppercase flex h-full items-center justify-center">
                {translations.outputPlaceholder}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
