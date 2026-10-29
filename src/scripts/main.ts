import { initDeck } from './deck';
import { initLights } from './lights';
import { initLivery } from './livery';
import { initRounds } from './rounds';

initLivery();
initRounds();
initDeck();
initLights();

requestAnimationFrame(() => {
  requestAnimationFrame(() => document.documentElement.classList.remove('preload'));
});
