import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { createHgptoVoice } from "./hgpto-voice";

function harness(rejection?: Error) {
  const clips: { url: string; audio: HTMLAudioElement; error?: () => void; paused: boolean }[] = [];
  const player = createHgptoVoice((url) => {
    const clip = { url, audio: {} as HTMLAudioElement, error: undefined as (() => void) | undefined, paused: false };
    Object.assign(clip.audio, {
      volume: 1,
      pause: () => { clip.paused = true; },
      play: () => rejection ? Promise.reject(rejection) : Promise.resolve(),
      addEventListener: (_: string, handler: () => void) => { clip.error = handler; },
    });
    clips.push(clip);
    return clip.audio;
  });
  return { player, clips };
}

describe("Sir H. Gepeto voice rules", () => {
  test("no clip before interaction", () => {
    const { player, clips } = harness();
    player.play(false, false, 0.45, () => {});
    assert.equal(clips.length, 0);
  });
  test("normal mood uses only tender voice A", () => {
    const { player, clips } = harness();
    player.play(true, false, 0.45, () => {});
    assert.equal(clips[0]?.url.endsWith("/gepeto-voix-a-tendre.mp3"), true);
  });
  test("grumpy mood uses only grumpy voice A", () => {
    const { player, clips } = harness();
    player.play(true, true, 0.45, () => {});
    assert.equal(clips[0]?.url.endsWith("/gepeto-voix-a-grognon.mp3"), true);
  });
  test("soft volume is retained during playback", () => {
    const { player, clips } = harness();
    player.play(true, false, 1, () => {});
    player.setVolume(0.45);
    assert.equal(clips[0]?.audio.volume, 0.45);
  });
  test("mute stops playback and blocks new clips", () => {
    const { player, clips } = harness();
    player.play(true, false, 0.45, () => {});
    player.setVolume(0);
    player.play(true, false, 0, () => {});
    assert.equal(clips[0]?.paused, true);
    assert.equal(clips.length, 1);
  });
  test("missing file falls back once", async () => {
    const { player, clips } = harness(new Error("Missing file"));
    let fallbacks = 0;
    player.play(true, false, 0.45, () => { fallbacks++; });
    clips[0]?.error?.();
    await Promise.resolve();
    assert.equal(fallbacks, 1);
  });
  test("autoplay refusal stays silent instead of falling back", async () => {
    const error = new Error("Interaction required");
    error.name = "NotAllowedError";
    const { player } = harness(error);
    let fallbacks = 0;
    player.play(true, false, 0.45, () => { fallbacks++; });
    await Promise.resolve();
    assert.equal(fallbacks, 0);
  });
  test("cancelled clip cannot trigger delayed fallback", () => {
    const { player, clips } = harness();
    let fallbacks = 0;
    player.play(true, false, 0.45, () => { fallbacks++; });
    player.stop();
    clips[0]?.error?.();
    assert.equal(fallbacks, 0);
  });
});