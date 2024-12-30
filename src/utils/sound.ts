import { AUDIO_FILES } from '../constants/audio';

const playSound = (src: string) => {
  const audio = new Audio();
  audio.src = src;
  audio.volume = 1.0;
  audio.autoplay = true;
  audio.load();
  
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.error(`Error playing sound (${src}):`, error);
    });
  }
}

export const playBuzzer = () => playSound(AUDIO_FILES.BUZZER);
export const playVoz = () => playSound(AUDIO_FILES.VOZ);