import { Translations } from '../types';

export const es: Translations = {
  title: 'Aparato Morse',
  subtitle: 'Aprende y traduce el código Morse',
  convertToMorse: 'Convertir a Morse',
  convertToText: 'Convertir a texto',
  inputPlaceholder: 'Escribe el texto aquí...',
  outputPlaceholder: 'El resultado aparecerá aquí...',
  tapButton: 'Tocar',
  clear: 'Limpiar',
  copy: 'Copiar',
  play: 'Reproducir',
  learningMode: 'Aprendizaje',
  translatorMode: 'Traductor',
  glossaryMode: 'Glosario',
  cheatsheet: 'Alfabeto',
  close: 'Cerrar',
  instructions: {
    dot: 'Toque corto = Punto (.)',
    dash: 'Toque largo = Raya (-)',
    space: 'Pausa = Espacio entre letras',
  },
  instructionTitle: '¿Cómo usar?',
  usageInstructions: [
    'Punto (.): Toque rápido (menos de 160 ms)',
    'Guion (-): Toque prolongado (más de 160 ms)',
    'Seleccionar letra: Toque el símbolo deseado en las sugerencias',
    'Espacio: Use el botón de "Espacio" para separar palabras',
    'Traductor: Cambie al modo traductor para convertir texto a código Morse'
  ],
};
