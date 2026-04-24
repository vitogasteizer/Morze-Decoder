import { GlossaryItem } from '../types';

export const GLOSSARY: Record<'ka' | 'es', GlossaryItem[]> = {
  ka: [
    { term: 'SOS', code: '... --- ...', meaning: 'საერთაშორისო განგაშის სიგნალი. გამოიყენება კატასტროფის ან საფრთხის დროს.' },
    { term: 'CQ', code: '-.-. --.-', meaning: 'მიმართვა ნებისმიერი სადგურისადმი. გამოიყენება კავშირის დასაწყებად.' },
    { term: 'QRV', code: '--.- .-. ...-', meaning: 'მე მზად ვარ. მზადყოფნა ინფორმაციის მისაღებად.' },
    { term: 'QRS', code: '--.- .-. ...', meaning: 'გთხოვთ, გადასცეთ უფრო ნელა.' },
    { term: '73', code: '--... ...--', meaning: 'საუკეთესო სურვილები. გამოიყენება დამშვიდობებისას.' },
    { term: '88', code: '---.. ---..', meaning: 'სიყვარული და კოცნა. მეგობრული დამშვიდობება.' },
    { term: 'K', code: '-.-', meaning: 'სიგნალი გადაცემის დასასრულისთვის. "ველოდები პასუხს".' },
    { term: 'R', code: '.-.', meaning: 'მიღებულია / გასაგებია.' },
    { term: 'GM', code: '--. --', meaning: 'დილა მშვიდობისა (Good Morning).' },
    { term: 'GA', code: '--. .-', meaning: 'დღე მშვიდობისა (Good Afternoon).' },
  ],
  es: [
    { term: 'SOS', code: '... --- ...', meaning: 'Señal internacional de socorro. Utilizada en situaciones de emergencia.' },
    { term: 'CQ', code: '-.-. --.-', meaning: 'Llamada general a cualquier estación. Usada para iniciar contacto.' },
    { term: 'QRV', code: '--.- .-. ...-', meaning: 'Estoy listo para recibir mensajes.' },
    { term: 'QRS', code: '--.- .-. ...', meaning: 'Por favor, transmita más despacio.' },
    { term: '73', code: '--... ...--', meaning: 'Saludos cordiales. Usado al despedirse.' },
    { term: '88', code: '---.. ---..', meaning: 'Amor y besos. Despedida afectuosa.' },
    { term: 'K', code: '-.-', meaning: 'Invitación a transmitir. "Cambio".' },
    { term: 'R', code: '.-.', meaning: 'Recibido / Entendido.' },
    { term: 'GM', code: '--. --', meaning: 'Buenos días (Good Morning).' },
    { term: 'GA', code: '--. .-', meaning: 'Buenas tardes (Good Afternoon).' },
  ]
};
