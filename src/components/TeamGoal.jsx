import {
  DAYS_PER_STAGE,
  TOTAL_STAGES,
  CURRENT_STAGE,
  ROUND_TARGETS_PCT,
  OVERALL_TARGET_PCT,
  STAGE_NAME,
} from '../data/stage1';
import { TEAM_MAX_DAILY_SCORE } from '../utils/stats';
import { hexToRgba } from '../utils/color';

const STAGE_MAX = DAYS_PER_STAGE * TEAM_MAX_DAILY_SCORE;
const CHALLENGE_MAX = TOTAL_STAGES * STAGE_MAX;
const CURRENT_TARGET_PCT = ROUND_TARGETS_PCT[CURRENT_STAGE - 1];
const STAGE_TARGET = Math.round(STAGE_MAX * (CURRENT_TARGET_PCT / 100));
const CHALLENGE_TARGET = Math.round(CHALLENGE_MAX * (OVERALL_TARGET_PCT / 100));

function GoalCard({ label, sublabel, value, max, target, targetPctLabel, passed }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const targetPct = Math.round((target / max) * 100);
  const accent = passed === undefined ? '#3b82f6' : passed ? '#22c55e' : '#f59e0b';

  return (
    <div
      className="tint-card rounded-xl border p-4"
      style={{ '--tint-bg': hexToRgba(accent, 0.1), '--tint-border': hexToRgba(accent, 0.25) }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
          {sublabel && (
            <div className="text-xs text-gray-400 dark:text-gray-500">{sublabel}</div>
          )}
        </div>
        {passed !== undefined && (
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
              passed
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            }`}
          >
            {passed ? 'On target' : 'Below target'}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</span>
        <span className="text-sm text-gray-400">/ {max} pts ({pct}%)</span>
      </div>

      <div className="mt-2 relative h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full ${passed ? 'bg-green-500' : 'bg-amber-500'}`}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gray-900/60 dark:bg-white/60"
          style={{ left: `${targetPct}%` }}
          title={`Target: ${target} pts (${targetPctLabel}%)`}
        />
      </div>
      <div className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
        Target: {target} pts ({targetPctLabel}%)
      </div>
    </div>
  );
}

export default function TeamGoal({ stageTotal }) {
  const stagePassed = stageTotal >= STAGE_TARGET;

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] shadow-sm p-5 h-full">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Team goal</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Combined score across all 4 players — the target rises every round.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <GoalCard
          label={`${STAGE_NAME} combined score`}
          sublabel={`${DAYS_PER_STAGE} days × ${TEAM_MAX_DAILY_SCORE} pts/day max`}
          value={stageTotal}
          max={STAGE_MAX}
          target={STAGE_TARGET}
          targetPctLabel={CURRENT_TARGET_PCT}
          passed={stagePassed}
        />
        <GoalCard
          label="100-day challenge total"
          sublabel={`${TOTAL_STAGES} rounds × ${DAYS_PER_STAGE} days — progress so far`}
          value={stageTotal}
          max={CHALLENGE_MAX}
          target={CHALLENGE_TARGET}
          targetPctLabel={OVERALL_TARGET_PCT}
        />
      </div>
    </section>
  );
}
