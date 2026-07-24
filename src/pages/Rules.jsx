import {
  TOTAL_STAGES,
  DAYS_PER_STAGE,
  ROUND_TARGETS_PCT,
  OVERALL_TARGET_PCT,
  HABITS,
  USERS,
} from '../data/stage1';
import { TEAM_MAX_DAILY_SCORE } from '../utils/stats';
import RoundTracker from '../components/RoundTracker';

const MAX_PER_DAY = HABITS.length;
const MAX_PER_ROUND = MAX_PER_DAY * DAYS_PER_STAGE;
const TEAM_MAX_PER_ROUND = TEAM_MAX_DAILY_SCORE * DAYS_PER_STAGE;
const TEAM_MAX_CHALLENGE = TEAM_MAX_PER_ROUND * TOTAL_STAGES;

export default function Rules() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          How the challenge works
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {USERS.map((u) => u.name).join(', ')} are competing over{' '}
          <span className="font-medium text-gray-800 dark:text-gray-200">{TOTAL_STAGES} rounds</span>
          , with each round running for{' '}
          <span className="font-medium text-gray-800 dark:text-gray-200">{DAYS_PER_STAGE} days</span>.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Round progress
        </h3>
        <RoundTracker />
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Rules</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc pl-5">
          <li>
            Every day, each person logs 3 habits:{' '}
            {HABITS.map((h, i) => (
              <span key={h.key}>
                <span className="font-medium text-gray-800 dark:text-gray-200">{h.label}</span>
                {i < HABITS.length - 1 ? ', ' : ''}
              </span>
            ))}
            .
          </li>
          <li>Each habit completed = 1 point → max {MAX_PER_DAY} points a day.</li>
          <li>
            Over {DAYS_PER_STAGE} days that's a max of{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {MAX_PER_ROUND} points per round
            </span>
            .
          </li>
          <li>
            At the end of each round, everyone is ranked by total points — top 2 get 🥇🥈 on the
            leaderboard.
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">Team goal:</span> add
            up all 4 players' points — the target rises every round, so it gets harder to hit as
            the challenge goes on.
          </li>
          <li>
            Open a player from the sidebar to see their day-by-day breakdown and progress chart.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Round-by-round targets
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400">
                <th className="px-3 py-1.5 text-left font-medium">Round</th>
                <th className="px-3 py-1.5 font-medium">Target %</th>
                <th className="px-3 py-1.5 font-medium">Target pts</th>
                <th className="px-3 py-1.5 font-medium">Max pts</th>
              </tr>
            </thead>
            <tbody>
              {ROUND_TARGETS_PCT.map((pct, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 dark:border-gray-800/60 odd:bg-gray-50/60 dark:odd:bg-white/2"
                >
                  <td className="px-3 py-1.5 text-left font-medium text-gray-800 dark:text-gray-200">
                    Round {i + 1}
                  </td>
                  <td className="px-3 py-1.5">{pct}%</td>
                  <td className="px-3 py-1.5">{Math.round(TEAM_MAX_PER_ROUND * (pct / 100))}</td>
                  <td className="px-3 py-1.5 text-gray-400">{TEAM_MAX_PER_ROUND}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200 dark:border-gray-800 font-semibold bg-gray-100 dark:bg-gray-800/60">
                <td className="px-3 py-2 text-left">Overall</td>
                <td className="px-3 py-2">{OVERALL_TARGET_PCT}%</td>
                <td className="px-3 py-2">{Math.round(TEAM_MAX_CHALLENGE * (OVERALL_TARGET_PCT / 100))}</td>
                <td className="px-3 py-2 text-gray-400 font-normal">{TEAM_MAX_CHALLENGE}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
