// Stage 1 — 20 day challenge (01-07-2026 to 20-07-2026)
// 1 = done, 0 = missed, null = not tracked that day

export const STAGE_NAME = 'Round 1';
export const CURRENT_STAGE = 1;
export const TOTAL_STAGES = 5;
export const DAYS_PER_STAGE = 20;

// Target % of the max combined team score each round must hit — rises each round
export const ROUND_TARGETS_PCT = [50, 60, 70, 80, 90];
export const OVERALL_TARGET_PCT =
  ROUND_TARGETS_PCT.reduce((sum, pct) => sum + pct, 0) / ROUND_TARGETS_PCT.length;

export const USERS = [
  { id: 'chinnu', name: 'Chinnu', color: '#EAB308', soft: '#FEF9C3' },
  { id: 'jibin', name: 'Jibin', color: '#6B7280', soft: '#E5E7EB' },
  { id: 'manu', name: 'Manu', color: '#F97316', soft: '#FFE4CC' },
  { id: 'vishnu', name: 'Vishnu', color: '#3B82F6', soft: '#DBEAFE' },
];

export const HABITS = [
  { key: 'workout', label: 'Workout' },
  { key: 'water', label: 'Water' },
  { key: 'noSweet', label: 'No Sweet' },
];

const N = null;

export const stage1Data = [
  { date: '01-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 1 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '02-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '03-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 0 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '04-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '05-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 0 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '06-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 0 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: 1, water: 1, noSweet: 1 } },
  { date: '07-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 1 }, vishnu: { workout: 1, water: 1, noSweet: 1 } },
  { date: '08-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: N, water: 1, noSweet: 1 } },
  { date: '09-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 0, noSweet: 0 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: 0, water: 0, noSweet: 0 } },
  { date: '10-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 0 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '11-07-2026', chinnu: { workout: 0, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 0 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '12-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 0 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '13-07-2026', chinnu: { workout: 1, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '14-07-2026', chinnu: { workout: 0, water: 1, noSweet: 1 }, jibin: { workout: 1, water: 1, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: 0, water: 0, noSweet: 0 } },
  { date: '15-07-2026', chinnu: { workout: 1, water: 0, noSweet: 0 }, jibin: { workout: 1, water: 0, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '16-07-2026', chinnu: { workout: 1, water: 0, noSweet: 1 }, jibin: { workout: 1, water: 0, noSweet: 1 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '17-07-2026', chinnu: { workout: 1, water: 0, noSweet: 1 }, jibin: { workout: 0, water: 0, noSweet: 1 }, manu: { workout: 1, water: 0, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '18-07-2026', chinnu: { workout: 0, water: 1, noSweet: 0 }, jibin: { workout: 0, water: 0, noSweet: 1 }, manu: { workout: 0, water: 0, noSweet: 0 }, vishnu: { workout: 0, water: 0, noSweet: 0 } },
  { date: '19-07-2026', chinnu: { workout: 1, water: 0, noSweet: 1 }, jibin: { workout: 0, water: 0, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 1 }, vishnu: { workout: N, water: N, noSweet: N } },
  { date: '20-07-2026', chinnu: { workout: 0, water: 1, noSweet: 1 }, jibin: { workout: 0, water: 0, noSweet: 1 }, manu: { workout: 1, water: 1, noSweet: 0 }, vishnu: { workout: N, water: N, noSweet: N } },
];
