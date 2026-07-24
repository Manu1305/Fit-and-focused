import { useState } from 'react';
import {
  TOTAL_STAGES,
  CURRENT_STAGE,
  DAYS_PER_STAGE,
  ROUND_TARGETS_PCT,
  HABITS,
} from '../data/stage1';
import { TEAM_MAX_DAILY_SCORE } from '../utils/stats';

const TEAM_MAX_PER_ROUND = TEAM_MAX_DAILY_SCORE * DAYS_PER_STAGE;

export default function RoundTracker() {
  const [selected, setSelected] = useState(CURRENT_STAGE);
  const rounds = Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1);

  const targetPct = ROUND_TARGETS_PCT[selected - 1];
  const targetPts = Math.round(TEAM_MAX_PER_ROUND * (targetPct / 100));
  const status =
    selected < CURRENT_STAGE ? 'Completed' : selected === CURRENT_STAGE ? 'In progress' : 'Upcoming';

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {rounds.map((round) => {
          const isDone = round < CURRENT_STAGE;
          const isCurrent = round === CURRENT_STAGE;
          const isSelected = round === selected;
          return (
            <button
              key={round}
              type="button"
              onClick={() => setSelected(round)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 rounded-xl text-xs font-medium border text-center cursor-pointer hover:opacity-90 transition ${
                isCurrent
                  ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                  : isDone
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900'
                  : 'bg-gray-50 text-gray-400 border-gray-200 dark:bg-gray-800/40 dark:text-gray-500 dark:border-gray-800'
              } ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-[#161922]' : ''}`}
            >
              <span className="text-base leading-none">{isDone ? '✅' : isCurrent ? '🔥' : '🔒'}</span>
              <span>Round {round}</span>
              <span className="opacity-70 font-normal">{DAYS_PER_STAGE} days</span>
              <span className="opacity-70 font-normal">Target {ROUND_TARGETS_PCT[round - 1]}%</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Round {selected} rules
          </h4>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
            {status}
          </span>
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
          <li>
            Runs for {DAYS_PER_STAGE} days — same daily habits as every round:{' '}
            {HABITS.map((h) => h.label).join(', ')}.
          </li>
          <li>
            Team must reach{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">{targetPct}%</span> of
            the max combined score —{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {targetPts} of {TEAM_MAX_PER_ROUND} pts
            </span>
            .
          </li>
          <li>Top 2 participants by individual total get 🥇🥈 on the leaderboard once the round ends.</li>
        </ul>
      </div>
    </div>
  );
}
