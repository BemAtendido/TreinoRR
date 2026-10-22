/* Relogio fixo apenas para testes do Coach com historico de julho/setembro de 2026.
 * Date.now() continua real para timeouts, expiracao de propostas e limites.
 * Nunca importe este arquivo no servidor de producao.
 */
const NativeDate = globalThis.Date;
const FIXED_DATE = '2026-09-05T12:00:00.000Z';
globalThis.Date = class CoachTestDate extends NativeDate {
  constructor(...args) {
    if (args.length === 0) super(FIXED_DATE);
    else super(...args);
  }
  static now() { return NativeDate.now(); }
};
