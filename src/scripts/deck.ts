import { CAROUSEL_MQ } from './config';

const WHEEL_GESTURE_GAP_MS = 180;
const WHEEL_THRESHOLD = 28;
const WHEEL_LOCK_MS = 650;
const SWIPE_THRESHOLD = 60;
const CAR_TRAVEL_MS = 700;

interface GoOptions {
  push?: boolean;
  focus?: boolean;
  instant?: boolean;
  announce?: boolean;
}

export function initDeck(): void {
  const root = document.documentElement;
  const deck = document.querySelector<HTMLElement>('[data-deck]');
  const track = document.querySelector<HTMLElement>('[data-track]');
  if (!deck || !track) return;

  const slides = [...track.querySelectorAll<HTMLElement>('[data-slide]')];
  const ids = slides.map((s) => s.id);
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.tower-link[data-nav-index]')];
  const titles = slides.map((s, i) => navLinks[i]?.querySelector('.tower-title')?.textContent?.trim() ?? s.id);
  const live = document.querySelector<HTMLElement>('[data-live]');
  const lapCurrent = document.querySelector<HTMLElement>('[data-lap-current]');
  const lapTitle = document.querySelector<HTMLElement>('[data-lap-title]');
  const prevBtn = document.querySelector<HTMLButtonElement>('[data-deck-prev]');
  const nextBtn = document.querySelector<HTMLButtonElement>('[data-deck-next]');
  const circuit = createCircuit(slides.length);
  const mq = window.matchMedia(CAROUSEL_MQ);

  let index = 0;
  let carousel = false;
  let observer: IntersectionObserver | null = null;

  const indexFromHash = (): number => {
    const id = decodeURIComponent(location.hash.slice(1));
    const i = ids.indexOf(id);
    return i === -1 ? 0 : i;
  };

  /** Updates every indicator (tower, lap counter, circuit) without moving anything. */
  const setActive = (i: number, announce: boolean) => {
    index = i;
    navLinks.forEach((link, n) => {
      if (n === i) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    const activeLink = navLinks[i];
    const list = activeLink?.closest('ol');
    if (!carousel && activeLink && list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: activeLink.offsetLeft - list.offsetLeft - 12, behavior: 'smooth' });
    }
    if (lapCurrent) lapCurrent.textContent = String(i + 1);
    if (lapTitle) lapTitle.textContent = titles[i] ?? '';
    if (prevBtn) prevBtn.disabled = i === 0;
    if (nextBtn) nextBtn.disabled = i === slides.length - 1;
    circuit?.moveTo(i);
    if (announce && live) live.textContent = `Lap ${i + 1} of ${slides.length}: ${titles[i]}`;
  };

  const goTo = (target: number, opts: GoOptions = {}) => {
    const i = Math.max(0, Math.min(slides.length - 1, target));
    const changed = i !== index;

    if (carousel) {
      if (opts.instant) {
        track.classList.add('is-instant');
        requestAnimationFrame(() => requestAnimationFrame(() => track.classList.remove('is-instant')));
      }
      track.style.setProperty('--i', String(i));
      slides.forEach((s, n) => (s.inert = n !== i));
      if (opts.focus) slides[i]?.querySelector<HTMLElement>('[data-slide-heading]')?.focus({ preventScroll: true });
    } else {
      slides[i]?.scrollIntoView({ behavior: 'auto', block: 'start' });
      if (opts.focus) slides[i]?.querySelector<HTMLElement>('[data-slide-heading]')?.focus({ preventScroll: true });
    }

    if (opts.push && ids[i] && location.hash !== `#${ids[i]}`) {
      history.pushState(null, '', `#${ids[i]}`);
    }
    if (changed || opts.instant) setActive(i, opts.announce ?? true);
  };

  const step = (delta: number) => {
    const active = document.activeElement;
    const focusInSlide = active instanceof HTMLElement && Boolean(slides[index]?.contains(active));
    goTo(index + delta, { push: true, focus: focusInSlide });
  };

  /* ---------- Links: tower, CTAs, skip link ---------- */
  document.addEventListener('click', (event) => {
    if (!carousel || event.defaultPrevented) return;
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const i = ids.indexOf(link.hash.slice(1));
    if (i === -1) return;
    event.preventDefault();
    goTo(i, { push: true, focus: true });
  });

  prevBtn?.addEventListener('click', () => goTo(index - 1, { push: true }));
  nextBtn?.addEventListener('click', () => goTo(index + 1, { push: true }));

  // Fires for back/forward and for manual hash edits; vertical mode lets the browser handle it.
  window.addEventListener('popstate', () => {
    if (carousel) goTo(indexFromHash());
  });

  /* ---------- Keyboard ---------- */
  document.addEventListener('keydown', (e) => {
    if (!carousel || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target as HTMLElement | null;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const map: Record<string, () => void> = {
      ArrowRight: () => step(1),
      ArrowLeft: () => step(-1),
      PageDown: () => step(1),
      PageUp: () => step(-1),
      Home: () => goTo(0, { push: true }),
      End: () => goTo(slides.length - 1, { push: true }),
    };
    const action = map[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  });

  /* ---------- Wheel / trackpad (one slide per gesture) ---------- */
  let lastWheel = 0;
  let accum = 0;
  let gestureUsed = false;
  let lockUntil = 0;

  deck.addEventListener(
    'wheel',
    (e) => {
      if (!carousel || e.ctrlKey) return;
      const now = performance.now();
      if (now - lastWheel > WHEEL_GESTURE_GAP_MS) {
        accum = 0;
        gestureUsed = false;
      }
      lastWheel = now;

      const vertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const delta = vertical ? e.deltaY : e.deltaX;
      const slide = slides[index];

      // Let a tall slide scroll natively until it reaches its edge.
      if (vertical && slide && slide.scrollHeight > slide.clientHeight + 2) {
        const atTop = slide.scrollTop <= 0;
        const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 2;
        if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
          gestureUsed = true;
          return;
        }
      }

      e.preventDefault();
      if (gestureUsed || now < lockUntil) return;
      accum += delta;
      if (Math.abs(accum) >= WHEEL_THRESHOLD) {
        gestureUsed = true;
        lockUntil = now + WHEEL_LOCK_MS;
        goTo(index + Math.sign(accum), { push: true });
      }
    },
    { passive: false },
  );

  /* ---------- Touch swipe with drag-follow ---------- */
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dragging: boolean | null = null;

  deck.addEventListener(
    'touchstart',
    (e) => {
      if (!carousel || e.touches.length !== 1) return;
      const touch = e.touches[0]!;
      startX = touch.clientX;
      startY = touch.clientY;
      dx = 0;
      dragging = null;
    },
    { passive: true },
  );

  deck.addEventListener(
    'touchmove',
    (e) => {
      if (!carousel || dragging === false) return;
      const touch = e.touches[0];
      if (!touch) return;
      dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (dragging === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        dragging = Math.abs(dx) > Math.abs(dy) * 1.2;
        if (!dragging) return;
        track.classList.add('is-dragging');
      }
      const atEdge = (index === 0 && dx > 0) || (index === slides.length - 1 && dx < 0);
      track.style.setProperty('--drag', `${atEdge ? dx * 0.25 : dx}px`);
    },
    { passive: true },
  );

  const endTouch = () => {
    if (!dragging) return;
    dragging = null;
    track.classList.remove('is-dragging');
    track.style.setProperty('--drag', '0px');
    if (Math.abs(dx) > SWIPE_THRESHOLD) goTo(index + (dx < 0 ? 1 : -1), { push: true });
  };
  deck.addEventListener('touchend', endTouch);
  deck.addEventListener('touchcancel', endTouch);

  /* ---------- Mode switching ---------- */
  const enableCarousel = () => {
    carousel = true;
    root.classList.add('carousel');
    observer?.disconnect();
    observer = null;
    goTo(index, { instant: true, announce: false });
  };

  const enableVertical = () => {
    carousel = false;
    root.classList.remove('carousel');
    track.style.removeProperty('--i');
    track.style.removeProperty('--drag');
    slides.forEach((s) => (s.inert = false));

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(slides.indexOf(entry.target as HTMLElement), false);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    slides.forEach((s) => observer?.observe(s));
  };

  const applyMode = (initial: boolean) => {
    if (mq.matches) {
      enableCarousel();
    } else {
      const wasCarousel = carousel;
      enableVertical();
      if (wasCarousel && !initial) slides[index]?.scrollIntoView({ block: 'start' });
    }
  };

  index = indexFromHash();
  applyMode(true);
  setActive(index, false);
  mq.addEventListener('change', () => applyMode(false));
}

/* ---------- Circuit progress map ---------- */
function createCircuit(count: number) {
  const svg = document.querySelector<SVGSVGElement>('[data-circuit]');
  const path = svg?.querySelector<SVGPathElement>('[data-circuit-path]');
  const done = svg?.querySelector<SVGPathElement>('[data-circuit-done]');
  const car = svg?.querySelector<SVGCircleElement>('[data-circuit-car]');
  const markerGroup = svg?.querySelector<SVGGElement>('[data-circuit-markers]');
  if (!svg || !path || !done || !car || !markerGroup) return null;

  const total = path.getTotalLength();
  const stops = Array.from({ length: count }, (_, i) => (total * i) / count);
  const ns = 'http://www.w3.org/2000/svg';
  const markers: SVGCircleElement[] = [];

  stops.forEach((len, i) => {
    const p = path.getPointAtLength(len);
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('class', 'circuit-marker');
    dot.setAttribute('cx', String(p.x));
    dot.setAttribute('cy', String(p.y));
    dot.setAttribute('r', '3.2');
    markerGroup.append(dot);
    markers.push(dot);
    if (i > 0) {
      const label = document.createElementNS(ns, 'text');
      label.setAttribute('class', 'circuit-marker-label');
      label.setAttribute('x', String(p.x + 6));
      label.setAttribute('y', String(p.y - 6));
      label.textContent = String(i + 1);
      markerGroup.append(label);
    }
  });

  done.style.strokeDasharray = `${total}`;
  let currentLen = 0;
  let frame = 0;

  const render = (len: number) => {
    const p = path.getPointAtLength(len);
    car.setAttribute('cx', String(p.x));
    car.setAttribute('cy', String(p.y));
    done.style.strokeDashoffset = String(total - len);
  };
  render(0);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  return {
    moveTo(i: number) {
      const target = stops[i] ?? 0;
      markers.forEach((m, n) => m.classList.toggle('is-passed', n <= i));
      svg.setAttribute('aria-label', `Circuit progress: lap ${i + 1} of ${count}`);
      cancelAnimationFrame(frame);
      if (reduced.matches) {
        currentLen = target;
        render(target);
        return;
      }
      const from = currentLen;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / CAR_TRAVEL_MS);
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        currentLen = from + (target - from) * eased;
        render(currentLen);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    },
  };
}
