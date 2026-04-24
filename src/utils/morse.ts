import { MorseNode } from '../types';

// International and Georgian Morse Map
export const MORSE_MAP: Record<string, string> = {
  // Latin
  'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',
  'E': '.',     'F': '..-.',  'G': '--.',   'H': '....',
  'I': '..',    'J': '.---',  'K': '-.-',   'L': '.-..',
  'M': '--',    'N': '-.',    'O': '---',   'P': '.--.',
  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
  'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',
  'Y': '-.--',  'Z': '--..',
  // Georgian 
  'ა': '.-',    'ბ': '-...',  'გ': '--.',   'დ': '-..',
  'ე': '.',     'ვ': '.--',   'ზ': '--..',  'თ': '-.-.',
  'ი': '..',    'კ': '-.-',   'ლ': '.-..',  'მ': '--',
  'ნ': '-.',    'ო': '---',   'პ': '.--.',  'ჟ': '...-',
  'რ': '.-.',   'ს': '...',   'ტ': '-',     'უ': '..-',
  'ფ': '..-.',  'ქ': '---.',  'ღ': '--.-',  'ყ': '-.--',
  'შ': '----',  'ჩ': '---..', 'ც': '-...-', 'ძ': '--..-',
  'წ': '-.---', 'ჭ': '--...-', 'ხ': '-..-',  'ჯ': '.---',
  'ჰ': '....',
  // Numbers
  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.',
  ' ': '/'
};

export function textToMorse(text: string): string {
  return text
    .split('')
    .map(char => {
      const upper = char.toUpperCase();
      return MORSE_MAP[upper] || MORSE_MAP[char] || '';
    })
    .filter(code => code !== '')
    .join(' ');
}

export function morseToText(morse: string, lang: string = 'en'): string {
  const entries = Object.entries(MORSE_MAP);
  return morse
    .split(' ')
    .map(code => {
      if (code === '/') return ' ';
      const matches = entries.filter(([_, c]) => c === code);
      if (matches.length === 0) return '';
      if (matches.length === 1) return matches[0][0];
      
      // Determine based on lang
      const kaMatch = matches.find(([char]) => /[ა-ჰ]/.test(char));
      const latinMatch = matches.find(([char]) => /[a-zA-Z]/.test(char));
      
      if (lang === 'ka' && kaMatch) return kaMatch[0];
      if (latinMatch) return latinMatch[0];
      return matches[0][0];
    })
    .join('');
}

// Sound configuration
let audioCtx: AudioContext | null = null;

// Initialize audio context on demand and resume
export function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function playMorseSound(code: string) {
  initAudio();
  if (!audioCtx) return;

  const freq = 600;
  const dotTime = 0.1;
  const now = audioCtx.currentTime;
  
  let startTime = now;

  code.split('').forEach(symbol => {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, startTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    const duration = symbol === '.' ? dotTime : dotTime * 3;
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    
    startTime += duration + dotTime;
  });
}

// Morse Binary Tree for Visualization
// Root is empty
export const MORSE_TREE: MorseNode = {
  char: '',
  dot: {
    char: 'E',
    dot: {
      char: 'I',
      dot: {
        char: 'S',
        dot: { char: 'H' },
        dash: { char: 'V' }
      },
      dash: {
        char: 'U',
        dot: { char: 'F' },
        dash: { char: '' } // Undefined for ..--
      }
    },
    dash: {
      char: 'A',
      dot: {
        char: 'R',
        dot: { char: 'L' }
      },
      dash: {
        char: 'W',
        dot: { char: 'P' },
        dash: { char: 'J' }
      }
    }
  },
  dash: {
    char: 'T',
    dot: {
      char: 'N',
      dot: {
        char: 'D',
        dot: { char: 'B' },
        dash: { char: 'X' }
      },
      dash: {
        char: 'K',
        dot: { char: 'C' },
        dash: { char: 'Y' }
      }
    },
    dash: {
      char: 'M',
      dot: {
        char: 'G',
        dot: { char: 'Z' },
        dash: { char: 'Q' }
      },
      dash: {
        char: 'O',
        dot: { char: '' }, // ---.
        dash: { char: '' } // ----
      }
    }
  }
};
