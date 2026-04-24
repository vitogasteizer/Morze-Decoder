export interface Translations {
  title: string;
  subtitle: string;
  convertToMorse: string;
  convertToText: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  tapButton: string;
  clear: string;
  copy: string;
  play: string;
  learningMode: string;
  translatorMode: string;
  glossaryMode: string;
  cheatsheet: string;
  close: string;
  instructions: {
    dot: string;
    dash: string;
    space: string;
  };
  instructionTitle: string;
  usageInstructions: string[];
}

export type Language = 'ka' | 'es';

export interface GlossaryItem {
  term: string;
  code: string;
  meaning: string;
}

export interface MorseNode {
  char: string;
  dot?: MorseNode;
  dash?: MorseNode;
}
