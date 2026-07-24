import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { STAGE_NAME } from '../data/stage1';

export default function ContributionPie({ rows }) {
  const teamTotal = rows.reduce((sum, r) => sum + r.total, 0);

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#161922] shadow-sm p-5 h-full">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
        Contribution to team score
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Each player's share of the {teamTotal} pt combined total in {STAGE_NAME.toLowerCase()}.
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-56 h-56 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={rows}
                dataKey="total"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                isAnimationActive={false}
              >
                {rows.map((row) => (
                  <Cell key={row.id} fill={row.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} pts (${Math.round((value / teamTotal) * 100)}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          {rows.map((row) => {
            const pct = teamTotal ? Math.round((row.total / teamTotal) * 100) : 0;
            return (
              <div key={row.id} className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: row.color }}
                  />
                  <span className="text-gray-700 dark:text-gray-300 truncate">{row.name}</span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 shrink-0">
                  {row.total} pts · {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
