import { NUDGE_COPY } from './nudge-copy.js';
import { lineIndex } from './nudge.js';

// Todas as notificações push usam português brasileiro, independentemente
// do idioma selecionado no perfil.
const COPY = {
  restTitle: 'Descanso finalizado 💪',
  restBody: 'Hora de começar sua próxima série.',
  testBody: 'Notificação de teste ✅ Tudo certo! Você receberá seus lembretes de treino por aqui.',
  dayFallbackTitle: 'Hora de treinar! 💪',
  dayRoutineSuffix: 'hoje',
  dayBody: 'Seu treino está esperando por você. Bora treinar!',
};

export function restTimerPush(lang) {
  return { title: 'TreinoRR', body: `${COPY.restTitle} ${COPY.restBody}`, tag: 'rest-timer' };
}

export function testPush(lang) {
  return { title: 'TreinoRR', body: COPY.testBody, tag: 'test' };
}

export function dayReminderPush(lang, routine) {
  const heading = routine
    ? `${routine.emoji || '🏋️'} ${routine.name} ${COPY.dayRoutineSuffix}`
    : COPY.dayFallbackTitle;
  return { title: 'TreinoRR', body: `${heading} — ${COPY.dayBody}`, tag: 'day-reminder' };
}

export function nudgePush(lang, tone, routine, iso) {
  const copy = NUDGE_COPY['pt-BR'][NUDGE_COPY['pt-BR'][tone] ? tone : 'friendly'];
  const line = copy.lines[lineIndex(iso, copy.lines.length)];
  const name = routine?.name || 'seu treino';
  return { title: 'TreinoRR', body: `${copy.title} ${line.replace('{0}', () => name)}`, tag: 'nudge' };
}
