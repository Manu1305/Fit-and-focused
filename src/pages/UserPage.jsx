import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { stage1Data, USERS, HABITS, STAGE_NAME } from '../data/stage1';
import { getLeaderboard, getUserDailySeries, MAX_DAILY_SCORE } from '../utils/stats';
import HabitRadar from '../components/HabitRadar';
import StreakGrid from '../components/StreakGrid';

const ICON = { 1: '✅', 0: '❌', null: '➖' };

export default function UserPage() {
  const { userId } = useParams();
  const user = USERS.find((u) => u.id === userId);
  if (!user) return <Navigate to="/" replace />;

  const leaderboard = getLeaderboard(stage1Data);
  const row = leaderboard.find((r) => r.id === userId);
  const series = getUserDailySeries(userId, stage1Data);
  const maxTotal = 20 * MAX_DAILY_SCORE;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div
        className="rounded-2xl p-5 flex items-center justify-between"
        style={{ backgroundColor: user.soft }}
      >
        <div>
          <p className="text-xs font-medium text-gray-600">{STAGE_NAME}</p>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-gray-900">
            #{row.rank}
          </div>
          <div className="text-xs text-gray-600">out of {USERS.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total score" value={row.total} max={maxTotal} color={user.color} />
        {HABITS.map((h) => (
          <StatCard
            key={h.key}
            label={h.label}
            value={row[h.key]}
            max={20}
            color={user.color}
          />
        ))}
      </div>

      <section className="bg-white dark:bg-[#161922] rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Daily progress
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="day" fontSize={12} tickLine={false} />
            <YAxis
              yAxisId="left"
              domain={[0, MAX_DAILY_SCORE]}
              allowDecimals={false}
              fontSize={12}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, maxTotal]}
              allowDecimals={false}
              fontSize={12}
            />
            <Tooltip
              formatter={(value, name) => [value ?? 'n/a', name]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.date ?? label}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="score"
              name="Daily score"
              fill={user.color}
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              name="Cumulative"
              stroke="#1f2430"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </section>

      <div className="grid sm:grid-cols-2 gap-4 items-stretch">
        <HabitRadar user={user} totals={row} />
        <StreakGrid user={user} series={series} />
      </div>

      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Day by day
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="min-w-max w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800/60">
                <th className="px-3 py-2 text-left">Date</th>
                {HABITS.map((h) => (
                  <th key={h.key} className="px-3 py-2">{h.label}</th>
                ))}
                <th className="px-3 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {stage1Data.map((day, i) => (
                <tr key={day.date} className="odd:bg-gray-50/60 dark:odd:bg-white/[0.02] border-t border-gray-100 dark:border-gray-800/60">
                  <td className="px-3 py-1.5 text-left whitespace-nowrap">{day.date}</td>
                  {HABITS.map((h) => (
                    <td key={h.key} className="px-3 py-1.5">
                      {ICON[day[userId][h.key]]}
                    </td>
                  ))}
                  <td className="px-3 py-1.5 font-medium">
                    {series[i].score ?? '–'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Link to="/" className="inline-block text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
        ← Back to overview
      </Link>
    </div>
  );
}

function StatCard({ label, value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] p-3">
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {value}
        <span className="text-xs font-normal text-gray-400">/{max}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
