
import { NUDGE_COPY } from './nudge-copy.js';
import { lineIndex } from './nudge.js';

const COPY = {
  en: {
    restTitle: 'Rest over 💪',
    restBody: 'Time for your next set.',
    testBody: 'Test notification ✅ Notifications are working.',
    dayFallbackTitle: 'Workout planned today',
    dayRoutineSuffix: 'today',
    dayBody: "It's on your plan. Let's go 💪",
  },
  'pt-BR': {
    restTitle: 'Descanso finalizado 💪',
    restBody: 'Hora de começar sua próxima série.',
    testBody: 'Notificação de teste ✅ Tudo certo! Você receberá seus lembretes de treino por aqui.',
    dayFallbackTitle: 'Hora de treinar! 💪',
    dayRoutineSuffix: 'hoje',
    dayBody: 'Seu treino está esperando por você. Bora treinar!',
  },
};

const copyFor = lang => COPY[lang] || COPY['pt-BR'];

export function restTimerPush(lang) {
  const copy = copyFor(lang);
  return { title: copy.restTitle, body: copy.restBody, tag: 'rest-timer' };
}

export function testPush(lang) {
  return {
    title: 'TreinoRR',
    body: copyFor(lang).testBody,
    tag: 'test'
  };
}

export function dayReminderPush(lang, routine) {
  const copy = copyFor(lang);
  return {
    title: routine
      ? `${routine.emoji || '🏋️'} ${routine.name} ${copy.dayRoutineSuffix}`
      : copy.dayFallbackTitle,
    body: copy.dayBody,
    tag: 'day-reminder',
  };
}

const nudgeCopyFor = lang => {
  if (lang === 'de-CH') {
    const ch = s => s.replace(/ß/g, 'ss');
    return Object.fromEntries(
      Object.entries(NUDGE_COPY.de).map(([k, c]) => [
        k,
        { title: ch(c.title), lines: c.lines.map(ch) }
      ])
    );
  }
  return NUDGE_COPY[lang] || NUDGE_COPY['pt-BR'] || NUDGE_COPY.en;
};

export function nudgePush(lang, tone, routine, iso) {
  const copy = nudgeCopyFor(lang)[NUDGE_COPY.en[tone] ? tone : 'friendly'];
  const line = copy.lines[lineIndex(iso, copy.lines.length)];
  const name = routine?.name || 'TreinoRR';

  return {
    title: copy.title,
    body: line.replace('{0}', () => name),
    tag: 'nudge'
  };
}
