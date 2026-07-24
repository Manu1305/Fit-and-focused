import { hexToRgba } from '../utils/color';
import { MAX_DAILY_SCORE } from '../utils/stats';

export default function StreakGrid({ user, series }) {
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">20-day streak</h3>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
          <span>Low</span>
          {[0, 1, 2, 3].map((n) => (
            <span
              key={n}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: hexToRgba(user.color, 0.15 + (n / MAX_DAILY_SCORE) * 0.75) }}
            />
          ))}
          <span>High</span>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
        {series.map((d, i) => (
          <div
            key={d.date}
            title={`${d.date} — ${d.score === null ? 'not tracked' : `${d.score}/${MAX_DAILY_SCORE}`}`}
            className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-medium text-gray-500 dark:text-gray-300 ${
              d.score === null ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            style={{
              backgroundColor:
                d.score === null
                  ? undefined
                  : hexToRgba(user.color, 0.15 + (d.score / MAX_DAILY_SCORE) * 0.75),
            }}
          >
            <span className={d.score === null ? 'opacity-40' : d.score >= 2 ? 'text-white' : ''}>
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
