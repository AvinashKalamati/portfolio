import { LIGHTS_KEY } from './config';

const STEP_MS = 140;
const FIRST_MS = 80;
const HOLD_MS = 220;
const OUT_MS = 260;
const FADE_MS = 300;

/** ~1.2s F1 start sequence, shown once per session. Any key, click, wheel or touch skips it. */
export function initLights(): void {
  const root = document.documentElement;
  const el = document.querySelector<HTMLElement>('[data-lights]');
  if (!el || !root.classList.contains('lights-on')) return;

  const timers: number[] = [];
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    timers.forEach((t) => window.clearTimeout(t));
    el.classList.add('is-done');
    window.setTimeout(() => root.classList.remove('lights-on'), FADE_MS);
    try {
      sessionStorage.setItem(LIGHTS_KEY, '1');
    } catch {
      /* ignore */
    }
    removeListeners();
  };

  const skip = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    finish();
  };

  const events = ['keydown', 'wheel', 'touchstart'] as const;
  const removeListeners = () => {
    for (const type of events) window.removeEventListener(type, skip, true);
    el.removeEventListener('click', skip);
  };
  for (const type of events) window.addEventListener(type, skip, { capture: true, passive: false });
  el.addEventListener('click', skip);

  for (let i = 1; i <= 5; i++) {
    timers.push(window.setTimeout(() => (el.dataset.step = String(i)), FIRST_MS + (i - 1) * STEP_MS));
  }
  const outAt = FIRST_MS + 4 * STEP_MS + HOLD_MS;
  timers.push(
    window.setTimeout(() => {
      el.dataset.step = '0';
      el.classList.add('is-out');
    }, outAt),
  );
  timers.push(window.setTimeout(finish, outAt + OUT_MS));
}
