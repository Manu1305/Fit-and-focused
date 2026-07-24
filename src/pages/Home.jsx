import { Link } from 'react-router-dom';
import {
  stage1Data,
  STAGE_NAME,
  DAYS_PER_STAGE,
  CURRENT_STAGE,
  TOTAL_STAGES,
  ROUND_TARGETS_PCT,
} from '../data/stage1';
import { getLeaderboard, getTeamTotal, TEAM_MAX_DAILY_SCORE } from '../utils/stats';
import { hexToRgba } from '../utils/color';
import Leaderboard from '../components/Leaderboard';
import DataTable from '../components/DataTable';
import TeamGoal from '../components/TeamGoal';
import ContributionPie from '../components/ContributionPie';

const STAGE_MAX = DAYS_PER_STAGE * TEAM_MAX_DAILY_SCORE;

function StatTile({ label, value, sub, accent }) {
  return (
    <div
      className="tint-card rounded-xl border shadow-sm p-4"
      style={{ '--tint-bg': hexToRgba(accent, 0.12), '--tint-border': hexToRgba(accent, 0.3) }}
    >
      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
        {label}
      </div>
      <div className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
        {value}
      </div>
      {sub && <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function Home() {
  const rows = getLeaderboard(stage1Data);
  const stageTotal = getTeamTotal(stage1Data);
  const leader = rows[0];
  const stagePct = Math.round((stageTotal / STAGE_MAX) * 100);
  const roundTargetPct = ROUND_TARGETS_PCT[CURRENT_STAGE - 1];
  const passed = stageTotal >= Math.round(STAGE_MAX * (roundTargetPct / 100));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {STAGE_NAME} · {DAYS_PER_STAGE} days
          </p>
        </div>
        <Link
          to="/rules"
          className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          How does this work? →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Round"
          value={`${CURRENT_STAGE} / ${TOTAL_STAGES}`}
          sub={`${DAYS_PER_STAGE} days each`}
          accent="#6366f1"
        />
        <StatTile label="Leader" value={leader.name} sub={`${leader.total} pts`} accent={leader.color} />
        <StatTile
          label="Team score"
          value={`${stagePct}%`}
          sub={`${stageTotal} / ${STAGE_MAX} pts`}
          accent="#3b82f6"
        />
        <StatTile
          label="Status"
          value={passed ? 'On target' : 'Below target'}
          sub={`Target ${roundTargetPct}%`}
          accent={passed ? '#22c55e' : '#f59e0b'}
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-4 items-stretch">
        <div className="lg:col-span-3">
          <TeamGoal stageTotal={stageTotal} />
        </div>
        <div className="lg:col-span-2">
          <ContributionPie rows={rows} />
        </div>
      </div>

      <section>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {STAGE_NAME} Leaderboard
        </h2>
        <Leaderboard rows={rows} />
      </section>

      <section>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Full {DAYS_PER_STAGE}-day tracker · {STAGE_NAME}
        </h2>
        <DataTable data={stage1Data} totals={rows} />
      </section>
    </div>
  );
}
