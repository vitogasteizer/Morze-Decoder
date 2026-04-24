import React from 'react';
import { motion } from 'motion/react';
import { GLOSSARY } from '../constants/glossary';
import { Language } from '../types';
import { BookMarked, Volume2 } from 'lucide-react';
import { playMorseSound } from '../utils/morse';

interface GlossaryProps {
  lang: Language;
  translations: any;
}

export default function Glossary({ lang, translations }: GlossaryProps) {
  const items = GLOSSARY[lang] || GLOSSARY.ka;

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2 px-2">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
          <BookMarked size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black uppercase tracking-[2px]">{lang === 'ka' ? 'აბრევიატურები' : 'Abreviaturas'}</h2>
          <p className="text-[10px] text-text-secondary uppercase tracking-widest opacity-50">Morse Code Definitions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-surface-light border border-white/5 rounded-lg p-4 hover:border-primary/30 transition-all shadow-lg hover:shadow-primary/5 active:bg-white/[0.02]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-black/40 text-primary font-black text-xl border border-white/5 group-hover:scale-110 transition-transform shadow-inner">
                  {item.term}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 opacity-80">
                    {item.code.split(' ').map((symbol, sIndex) => (
                      <span key={sIndex} className="text-sm font-black font-mono text-primary tracking-tighter">
                        {symbol}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-text-primary leading-relaxed font-medium">
                    {item.meaning}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-[10px] font-mono text-primary/60 bg-black/30 px-3 py-2 rounded-lg border border-white/5 whitespace-nowrap font-black tracking-widest shadow-inner">
                  {item.code}
                </div>
                <button 
                  onClick={() => playMorseSound(item.code)}
                  className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20 shadow-lg group-hover:scale-105 active:scale-95 flex items-center justify-center"
                  title="Listen"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
