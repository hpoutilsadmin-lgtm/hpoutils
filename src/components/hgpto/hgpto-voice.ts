import tendre from "@/assets/gepeto-voix-a-tendre.mp3.asset.json";
import grognon from "@/assets/gepeto-voix-a-grognon.mp3.asset.json";

/** One clip at a time; never start or resume playback without permission. */
export function createHgptoVoice(makeAudio: (url: string) => HTMLAudioElement = (url) => new Audio(url)) {
  let current: HTMLAudioElement | undefined;
  let generation = 0;
  function stop() {
    generation++;
    current?.pause();
    current = undefined;
  }
  function setVolume(volume: number) {
    if (volume === 0) stop();
    else if (current) current.volume = volume;
  }
  function play(allowed: boolean, grumpy: boolean, volume: number, fallback: () => void) {
    if (!allowed || volume === 0) return;
    stop();
    const attempt = generation;
    const fail = () => {
      if (attempt !== generation) return;
      stop();
      fallback();
    };
    try {
      const audio = makeAudio(grumpy ? grognon.url : tendre.url);
      current = audio;
      audio.volume = volume;
      audio.loop = false;
      audio.addEventListener("error", fail, { once: true });
      void audio.play().catch((error: unknown) => {
        if (error instanceof Error && error.name === "NotAllowedError") {
          if (attempt === generation) stop();
          return;
        }
        fail();
      });
    } catch {
      fail();
    }
  }
  return { play, stop, setVolume };
}