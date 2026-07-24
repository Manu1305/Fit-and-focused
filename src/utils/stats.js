import { HABITS, USERS } from '../data/stage1';

export function getUserTotals(userId, data) {
  const totals = { workout: 0, water: 0, noSweet: 0, total: 0, trackedDays: 0 };
  data.forEach((day) => {
    const entry = day[userId];
    const tracked = HABITS.some((h) => entry[h.key] !== null);
    if (tracked) totals.trackedDays += 1;
    HABITS.forEach((h) => {
      if (entry[h.key] === 1) {
        totals[h.key] += 1;
        totals.total += 1;
      }
    });
  });
  return totals;
}

export function getTeamTotal(data) {
  return USERS.reduce((sum, user) => sum + getUserTotals(user.id, data).total, 0);
}

export function getLeaderboard(data) {
  const rows = USERS.map((user) => ({
    ...user,
    ...getUserTotals(user.id, data),
  }));
  rows.sort((a, b) => b.total - a.total);
  return rows.map((row, i) => ({ ...row, rank: i + 1 }));
}

export function getUserDailySeries(userId, data) {
  let cumulative = 0;
  return data.map((day, i) => {
    const entry = day[userId];
    const tracked = HABITS.some((h) => entry[h.key] !== null);
    const score = tracked
      ? HABITS.reduce((sum, h) => sum + (entry[h.key] === 1 ? 1 : 0), 0)
      : null;
    if (score !== null) cumulative += score;
    return {
      day: `D${i + 1}`,
      date: day.date,
      score,
      cumulative: tracked ? cumulative : null,
      tracked,
    };
  });
}

export const MAX_DAILY_SCORE = HABITS.length;
export const TEAM_MAX_DAILY_SCORE = HABITS.length * USERS.length;
