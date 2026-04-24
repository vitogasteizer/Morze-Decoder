import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, X, CheckCircle2 } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
  translations: any;
}

export default function InstructionsModal({ onClose, translations }: InstructionsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-[1px]">{translations.instructionTitle}</h2>
              <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest">Guide & Tips</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-secondary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {translations.usageInstructions.map((instruction: string, index: number) => (
              <div key={index} className="flex gap-4 items-start p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="mt-1 text-primary">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-sm text-text-primary leading-relaxed font-medium">
                  {instruction}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <h3 className="text-xs font-black text-primary uppercase mb-2">Pro Tip</h3>
            <p className="text-[11px] text-primary/80 leading-relaxed italic">
              "Master the rhythm: A dash is exactly 3x the duration of a dot. With Marconi, we've tuned the detection at 160ms for fluid one-handed operation."
            </p>
          </div>
        </div>

        <div className="p-6 bg-black/20">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-primary text-background font-black rounded-xl uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all"
          >
            {translations.close}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
