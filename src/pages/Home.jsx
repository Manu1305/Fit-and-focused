import { Link } from 'react-router-dom';
import { stage1Data, STAGE_NAME, DAYS_PER_STAGE } from '../data/stage1';
import { getLeaderboard, getTeamTotal } from '../utils/stats';
import Leaderboard from '../components/Leaderboard';
import DataTable from '../components/DataTable';
import TeamGoal from '../components/TeamGoal';
import ContributionPie from '../components/ContributionPie';

export default function Home() {
  const rows = getLeaderboard(stage1Data);
  const stageTotal = getTeamTotal(stage1Data);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h2>
        <Link
          to="/rules"
          className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          How does this work? →
        </Link>
      </div>

      <TeamGoal stageTotal={stageTotal} />

      <ContributionPie rows={rows} />

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
