import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HABITS } from '../data/stage1';

export default function HabitRadar({ user, totals }) {
  const data = HABITS.map((h) => ({
    habit: h.label,
    pct: Math.round((totals[h.key] / 20) * 100),
  }));

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] shadow-sm p-4 h-full">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Habit balance
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#9ca3af" strokeOpacity={0.35} />
          <PolarAngleAxis dataKey="habit" fontSize={12} tick={{ fill: 'currentColor' }} />
          <PolarRadiusAxis domain={[0, 100]} tickCount={5} fontSize={10} tick={{ fill: 'currentColor' }} />
          <Radar
            name={user.name}
            dataKey="pct"
            stroke={user.color}
            fill={user.color}
            fillOpacity={0.35}
            isAnimationActive={false}
          />
          <Tooltip formatter={(value) => `${value}%`} />
        </RadarChart>
      </ResponsiveContainer>
    </section>
  );
}
