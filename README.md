# Marconi - Morse Code Learning & Translation App

A professional, high-fidelity Morse code learning tool with real-time detection, translation, and glossary.

## Deployment to Vercel via GitHub

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Initialize git in your local project: `git init`.
   - Add files: `git add .`.
   - Commit: `git commit -m "Initial commit"`.
   - Connect to GitHub: `git remote add origin YOUR_REPO_URL`.
   - Push: `git push -u origin main`.

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com).
   - Click "New Project".
   - Import your GitHub repository.
   - Vercel will automatically detect the Vite setup.
   - Click "Deploy".

## Features

- **Learning Mode**: High-speed Morse detection algorithm (tuned at 160ms).
- **Translator**: Bi-directional translation (Latin/Georgian <-> Morse).
- **Glossary**: Common Morse abbreviations with audio playback.
- **Multi-language**: Support for Georgian (KA) and Spanish (ES).
- **Audio Feedback**: Realistic oscillator sound with smooth volume envelopes.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Motion (for animations)
- Lucide React (icons)
- Web Audio API
