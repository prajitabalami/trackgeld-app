export type GoalStatus = "onTrack" | "behind" | "completed";

export type Goal = {
  id: string;
  title: string;
  deadlineLabel: string;
  currentAmount: number;
  targetAmount: number;
  monthlyAllocation: number;
  status: GoalStatus;
  /** Only shown for "behind" — the catch-up amount per spec §6.3. */
  catchUpNote?: string;
};

// Shaped like GET /goals from spec §6.2 — swap for the real query result.
export const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Emergency fund",
    deadlineLabel: "Due Dec 2026",
    currentAmount: 1800,
    targetAmount: 3000,
    monthlyAllocation: 150,
    status: "onTrack"
  },
  {
    id: "2",
    title: "Japan trip 2027",
    deadlineLabel: "Due Mar 2027",
    currentAmount: 380,
    targetAmount: 2200,
    monthlyAllocation: 55,
    status: "behind",
    catchUpNote: "Behind schedule — increase to €120/month to stay on track"
  },
  {
    id: "3",
    title: "New laptop",
    deadlineLabel: "Completed Jun 2026",
    currentAmount: 1200,
    targetAmount: 1200,
    monthlyAllocation: 0,
    status: "completed"
  }
];
