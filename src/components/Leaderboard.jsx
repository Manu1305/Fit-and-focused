import { Link } from 'react-router-dom';
import { HABITS } from '../data/stage1';

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };
const MAX_POSSIBLE = 20 * HABITS.length;

export default function Leaderboard({ rows }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map((row) => {
        const isTop2 = row.rank <= 2;
        const pct = Math.round((row.total / MAX_POSSIBLE) * 100);
        return (
          <Link
            key={row.id}
            to={`/user/${row.id}`}
            className={`relative rounded-2xl p-4 border bg-white dark:bg-[#161922] transition-transform hover:-translate-y-0.5 ${
              isTop2
                ? 'border-transparent shadow-lg ring-2'
                : 'border-gray-200 dark:border-gray-800 shadow-sm'
            }`}
            style={isTop2 ? { boxShadow: `0 0 0 2px ${row.color}55` } : undefined}
          >
            {isTop2 && (
              <span className="absolute -top-3 -left-2 text-2xl drop-shadow">
                {MEDAL[row.rank]}
              </span>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {row.name}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                Rank #{row.rank}
              </span>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {row.total}
                  <span className="text-sm font-normal text-gray-400"> /{MAX_POSSIBLE}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {row.trackedDays} days tracked
                </div>
              </div>
              <div className="text-right text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                {HABITS.map((h) => (
                  <div key={h.key}>
                    {h.label}: <span className="font-medium text-gray-700 dark:text-gray-200">{row[h.key]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: row.color }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
