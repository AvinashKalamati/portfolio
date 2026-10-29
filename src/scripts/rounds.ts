/** Nested "race calendar" carousel inside the Experience slide (carousel mode only; CSS shows all rounds otherwise). */
export function initRounds(): void {
  const container = document.querySelector<HTMLElement>('[data-rounds]');
  if (!container) return;

  const tabs = [...container.querySelectorAll<HTMLButtonElement>('[data-round-tab]')];
  const panels = [...container.querySelectorAll<HTMLElement>('[data-round]')];
  const prev = container.querySelector<HTMLButtonElement>('[data-round-prev]');
  const next = container.querySelector<HTMLButtonElement>('[data-round-next]');
  const counter = container.querySelector<HTMLElement>('[data-round-current]');
  let current = 0;

  const select = (index: number, focusTab = false) => {
    const previous = current;
    current = Math.max(0, Math.min(panels.length - 1, index));
    if (current !== previous) {
      const panel = panels[current];
      panel?.setAttribute('data-entering', '');
      panel?.addEventListener('animationend', () => panel.removeAttribute('data-entering'), { once: true });
    }
    tabs.forEach((tab, i) => {
      const on = i === current;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    panels.forEach((panel, i) => panel.toggleAttribute('data-active', i === current));
    if (counter) counter.textContent = String(current + 1);
    if (prev) prev.disabled = current === 0;
    if (next) next.disabled = current === panels.length - 1;
    if (focusTab) tabs[current]?.focus();
  };

  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i)));
  prev?.addEventListener('click', () => select(current - 1));
  next?.addEventListener('click', () => select(current + 1));

  container.querySelector('[role="tablist"]')?.addEventListener('keydown', (event) => {
    const e = event as KeyboardEvent;
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowLeft: current - 1,
      Home: 0,
      End: panels.length - 1,
    };
    const target = keys[e.key];
    if (target === undefined) return;
    e.preventDefault();
    e.stopPropagation();
    select(target, true);
  });

  select(0);
}
