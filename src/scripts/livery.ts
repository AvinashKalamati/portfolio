import { LIVERY_KEY } from './config';

export function initLivery(): void {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-livery-id]')];
  if (!buttons.length) return;

  const sync = (id: string) => {
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.liveryId === id));
  };

  sync(root.dataset.livery ?? buttons[0]?.dataset.liveryId ?? 'red');

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const id = button.dataset.liveryId;
      if (!id) return;
      if (id === buttons[0]?.dataset.liveryId) delete root.dataset.livery;
      else root.dataset.livery = id;
      sync(id);
      try {
        localStorage.setItem(LIVERY_KEY, id);
      } catch {
        /* storage unavailable (private mode) — the choice just won't persist */
      }
    });
  }
}
