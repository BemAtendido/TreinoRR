import test from 'node:test';
import assert from 'node:assert/strict';
import { dayReminderPush, restTimerPush, testPush, nudgePush } from '../push-messages.js';

const TEST_MESSAGE = 'Notificação de teste ✅ Tudo certo! Você receberá seus lembretes de treino por aqui.';

test('envia notificação de teste em português com o nome TreinoRR', () => {
  for (const lang of ['pt-BR', 'en', 'fr', undefined]) {
    assert.deepEqual(testPush(lang), {
      title: 'TreinoRR',
      body: TEST_MESSAGE,
      tag: 'test',
    });
  }
});

test('envia notificação de descanso em português com o nome TreinoRR', () => {
  for (const lang of ['pt-BR', 'en', 'fr', undefined]) {
    assert.deepEqual(restTimerPush(lang), {
      title: 'TreinoRR',
      body: 'Descanso finalizado 💪 Hora de começar sua próxima série.',
      tag: 'rest-timer',
    });
  }
});

test('envia lembrete de treino em português com o nome TreinoRR', () => {
  for (const lang of ['pt-BR', 'en', 'fr', undefined]) {
    assert.deepEqual(dayReminderPush(lang, { name: 'Treino A', emoji: '💪' }), {
      title: 'TreinoRR',
      body: '💪 Treino A hoje — Seu treino está esperando por você. Bora treinar!',
      tag: 'day-reminder',
    });
    assert.deepEqual(dayReminderPush(lang, null), {
      title: 'TreinoRR',
      body: 'Hora de treinar! 💪 — Seu treino está esperando por você. Bora treinar!',
      tag: 'day-reminder',
    });
  }
});

test('envia incentivo em português com o nome TreinoRR', () => {
  for (const lang of ['pt-BR', 'en', undefined]) {
    const push = nudgePush(lang, 'friendly', { name: 'Treino A' }, '2026-10-22');
    assert.equal(push.title, 'TreinoRR');
    assert.equal(push.tag, 'nudge');
    assert.equal(typeof push.body, 'string');
    assert.ok(push.body.length > 0);
    assert.deepEqual(push, nudgePush('pt-BR', 'friendly', { name: 'Treino A' }, '2026-10-22'));
  }
});
