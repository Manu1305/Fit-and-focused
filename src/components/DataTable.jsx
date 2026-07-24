import { HABITS, USERS } from '../data/stage1';

function Cell({ value }) {
  if (value === null) return <span className="text-gray-300 dark:text-gray-700">–</span>;
  return value === 1 ? (
    <span className="text-green-600 dark:text-green-400 font-semibold">1</span>
  ) : (
    <span className="text-red-400 dark:text-red-400/80 font-semibold">0</span>
  );
}

export default function DataTable({ data, totals }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-max w-full text-sm text-center border-collapse">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="sticky left-0 z-10 bg-white dark:bg-[#161922] px-3 py-2 text-left border-b border-r border-gray-200 dark:border-gray-800 align-bottom"
            >
              Date
            </th>
            {USERS.map((user) => (
              <th
                key={user.id}
                colSpan={HABITS.length}
                className="px-2 py-2 font-semibold text-gray-900 border-b border-l border-gray-200 dark:border-gray-800"
                style={{ backgroundColor: user.soft }}
              >
                {user.name}
              </th>
            ))}
          </tr>
          <tr>
            {USERS.map((user) =>
              HABITS.map((h) => (
                <th
                  key={user.id + h.key}
                  className="px-2 py-1.5 font-medium text-gray-600 border-b border-l border-gray-200 dark:border-gray-800 dark:text-gray-700"
                  style={{ backgroundColor: user.soft }}
                >
                  <span className="dark:text-gray-800">{h.label}</span>
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((day) => (
            <tr key={day.date} className="odd:bg-gray-50/60 dark:odd:bg-white/[0.02]">
              <td className="sticky left-0 z-10 bg-inherit px-3 py-1.5 text-left border-r border-gray-200 dark:border-gray-800 whitespace-nowrap">
                {day.date}
              </td>
              {USERS.map((user) =>
                HABITS.map((h) => (
                  <td
                    key={user.id + h.key}
                    className="px-2 py-1.5 border-l border-gray-100 dark:border-gray-800/60"
                  >
                    <Cell value={day[user.id][h.key]} />
                  </td>
                ))
              )}
            </tr>
          ))}
          <tr className="font-semibold bg-gray-100 dark:bg-gray-800/60">
            <td className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-800/60 px-3 py-2 text-left border-r border-gray-200 dark:border-gray-800">
              Total
            </td>
            {USERS.map((user) =>
              HABITS.map((h) => (
                <td key={user.id + h.key} className="px-2 py-2 border-l border-gray-200 dark:border-gray-800">
                  {totals.find((t) => t.id === user.id)[h.key]}
                </td>
              ))
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
