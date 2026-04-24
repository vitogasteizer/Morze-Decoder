import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ka } from './i18n/ka';
import { es } from './i18n/es';
import { Language } from './types';
import { THEME } from './constants/theme';
import { MORSE_MAP, textToMorse, playMorseSound } from './utils/morse';
import MorseInput from './components/MorseInput';
import PredictionDisplay from './components/PredictionDisplay';
import Translator from './components/Translator';
import Glossary from './components/Glossary';
import PracticeMode from './components/PracticeMode';
import Cheatsheet from './components/Cheatsheet';
import InstructionsModal from './components/InstructionsModal';
import { BookOpen, Languages, Radio, Info, Eraser, Delete, BookMarked, HelpCircle, Target, Volume2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('ka');
  const [mode, setMode] = useState<'learning' | 'practice' | 'translator' | 'glossary'>('learning');
  const [morseBuffer, setMorseBuffer] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const translations = useMemo(() => (lang === 'ka' ? ka : es), [lang]);

  const handleBufferChange = (newBuffer: string) => {
    // Limited to 6 symbols for standard characters
    if (newBuffer.length > 6) return;
    setMorseBuffer(newBuffer);
  };

  const handleSelectChar = (char: string) => {
    setDecodedText(prev => prev + char);
    setMorseBuffer('');
  };

  const handleAddSpace = () => {
    setDecodedText(prev => prev + ' ');
    setMorseBuffer('');
  };

  const handleBackspace = () => {
    setMorseBuffer(prev => prev.slice(0, -1));
  };

  const handleClearDecoded = () => {
    setDecodedText('');
    setMorseBuffer('');
  };

  return (
    <div className="fixed inset-0 bg-background text-text-primary flex flex-col overflow-hidden select-none">
      <AnimatePresence>
        {showCheatsheet && (
          <Cheatsheet 
            translations={translations} 
            lang={lang}
            onClose={() => setShowCheatsheet(false)} 
          />
        )}
        {showInstructions && (
          <InstructionsModal 
            translations={translations}
            onClose={() => setShowInstructions(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="px-4 py-3 border-b border-surface-light flex items-center justify-between shrink-0 bg-surface/90 backdrop-blur z-50">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.postimg.cc/9fG99S6Y/App-icon-Morse.png" 
            alt="Logo" 
            className="w-8 h-8 rounded-md shadow-[0_0_15px_rgba(255,215,0,0.3)] object-cover"
          />
          <div className="hidden xs:block">
            <h1 className="text-xs font-black leading-none uppercase tracking-tighter">{translations.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-surface-light p-1 rounded-md border border-white/5 h-8 items-center">
            {mode === 'learning' && (
              <>
                <button 
                  onClick={() => setShowInstructions(true)}
                  className="h-full px-3 rounded-md text-[10px] font-black transition-all bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 flex items-center justify-center min-w-[28px]"
                  title={translations.instructionTitle}
                >
                  !
                </button>
                <div className="w-[1px] h-3 bg-white/10 mx-1" />
              </>
            )}
            <button 
              onClick={() => setShowCheatsheet(true)}
              className="h-full px-2 rounded-md text-[10px] font-black transition-all text-text-secondary hover:text-primary flex items-center justify-center"
              title={translations.cheatsheet}
            >
              <BookOpen size={14} />
            </button>
            <div className="w-[1px] h-3 bg-white/10 mx-1" />
            <button 
              onClick={() => setMode('translator')}
              className={`h-full px-2 rounded-md text-[10px] font-black transition-all flex items-center justify-center ${mode === 'translator' ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
              title={translations.translatorMode}
            >
              <Languages size={14} />
            </button>
            <div className="w-[1px] h-3 bg-white/10 mx-1" />
            <button 
              onClick={() => setMode('glossary')}
              className={`h-full px-2 rounded-md text-[10px] font-black transition-all flex items-center justify-center ${mode === 'glossary' ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}
              title={translations.glossaryMode}
            >
              <BookMarked size={14} />
            </button>
          </div>

          <div className="flex bg-surface-light p-1 rounded-md border border-white/5 h-8 items-center">
            <button 
              onClick={() => setLang('ka')}
              className={`px-3 py-1 rounded-md text-[10px] font-black transition-all uppercase ${lang === 'ka' ? 'bg-primary text-black' : 'text-text-secondary'}`}
            >
              KA
            </button>
            <button 
              onClick={() => setLang('es')}
              className={`px-3 py-1 rounded-md text-[10px] font-black transition-all uppercase ${lang === 'es' ? 'bg-primary text-black' : 'text-text-secondary'}`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      {/* Mode Nav - Very thin */}
      <nav className="flex bg-surface/50 border-b border-surface-light shrink-0">
        <button
          onClick={() => setMode('learning')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all ${mode === 'learning' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-text-secondary'}`}
        >
          <BookMarked size={16} />
          <span className="font-bold text-[9px] uppercase tracking-widest">{translations.learningMode}</span>
        </button>
        <button
          onClick={() => setMode('translator')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-all ${mode === 'translator' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-text-secondary'}`}
        >
          <Languages size={16} />
          <span className="font-bold text-[9px] uppercase tracking-widest">{translations.translatorMode}</span>
        </button>
      </nav>

      {/* Main Content - TIGHT for mobile */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === 'learning' ? (
            <motion.div
              key="learning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col p-3 gap-3 overflow-hidden"
            >
              {/* TOP: Input Section */}
              <div className="shrink-0">
                <MorseInput 
                  onCodeChange={handleBufferChange} 
                  currentCode={morseBuffer}
                  onBackspace={handleBackspace}
                  translations={translations}
                />
              </div>

              {/* MIDDLE: Suggestions Grid - Takes most space */}
              <div className="flex-1 flex flex-col bg-surface-light rounded-lg border border-white/5 overflow-hidden shadow-inner">
                <div className="p-2 border-b border-white/5 bg-black/20 flex justify-between items-center shrink-0">
                  <span className="text-[8px] font-black text-primary uppercase tracking-[2px]">
                    {lang === 'ka' ? 'შემოთავაზება' : 'Sugerencias'}
                  </span>
                  <div className="text-xs font-bold font-mono text-primary bg-black/40 px-3 py-0.5 rounded-full border border-primary/20">
                    {morseBuffer || '---'}
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                  <PredictionDisplay 
                    currentPath={morseBuffer} 
                    onSelect={handleSelectChar} 
                    lang={lang} 
                  />
                </div>

                {/* Space bar integrated here for height efficiency */}
                <button
                  onClick={handleAddSpace}
                  className="w-full py-3 bg-primary/10 border-t border-white/5 text-primary active:bg-primary active:text-black transition-all font-black text-[10px] uppercase tracking-[4px] flex items-center justify-center gap-4"
                >
                  {translations.instructions.space}
                </button>
              </div>

              {/* BOTTOM: Output Area */}
              <div className="bg-surface-light p-3 rounded-lg border border-white/5 min-h-[110px] flex flex-col shrink-0 relative shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-1 relative z-10">
                  <span className="text-[8px] font-black text-text-secondary uppercase tracking-[2px]">
                    {lang === 'ka' ? 'ტექსტი' : 'Texto'}
                  </span>
                  <div className="flex gap-2 relative z-20">
                    {decodedText && (
                      <button 
                        onClick={() => playMorseSound(textToMorse(decodedText))}
                        className="p-1 rounded bg-black/20 text-text-secondary hover:text-primary transition-colors"
                        title={translations.play}
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                    {decodedText && (
                      <button 
                        onClick={handleClearDecoded}
                        className="p-1 rounded bg-black/20 text-text-secondary hover:text-primary transition-colors"
                      >
                        <Eraser size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center bg-black/20 rounded-md border border-white/5 relative z-10 overflow-hidden">
                  <div className="text-3xl font-mono font-black text-primary overflow-x-auto whitespace-nowrap px-4 scrollbar-hide py-1">
                    {decodedText || <span className="opacity-10 tracking-[10px] text-lg">READY</span>}
                  </div>
                  {decodedText && (
                    <div className="text-[8px] font-mono font-black text-primary/40 tracking-[3px] overflow-x-auto whitespace-nowrap px-4 scrollbar-hide">
                      {textToMorse(decodedText)}
                    </div>
                  )}
                </div>
              </div>

              {/* PRACTICE BUTTON */}
              <button
                onClick={() => setMode('practice')}
                className="w-full py-4 bg-primary text-background rounded-xl font-black uppercase tracking-[4px] shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 shrink-0"
              >
                <Target size={20} />
                {translations.practiceMode}
              </button>
            </motion.div>
          ) : mode === 'practice' ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col overflow-hidden"
            >
              <PracticeMode translations={translations} lang={lang} onBack={() => setMode('learning')} />
            </motion.div>
          ) : mode === 'translator' ? (
            <motion.div
              key="translator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-4 flex flex-col overflow-hidden"
            >
              <Translator translations={translations} lang={lang} />
            </motion.div>
          ) : (
            <motion.div
              key="glossary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-4 flex flex-col overflow-hidden"
            >
              <Glossary translations={translations} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer - Minimal */}
      <footer className="px-4 py-2 border-t border-surface-light flex items-center justify-between shrink-0 bg-surface/90">
        <div className="flex items-center gap-2 text-[7px] font-bold text-text-secondary tracking-[2px] uppercase">
          <span className="w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_var(--color-primary)]" />
          Live
        </div>
        <div className="text-[7px] font-mono text-text-secondary opacity-30">
          MARCONI v1.0.5
        </div>
      </footer>
    </div>
  );
}
