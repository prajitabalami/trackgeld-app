import { Activity, Bell, Target, TrendingUp } from "lucide-react-native";

import { theme } from "../theme/theme";

export type InsightType = "pattern" | "warning" | "lifestyleCreep" | "goalAlert";

export type Insight = {
  id: string;
  type: InsightType;
  timestampLabel: string;
  body: string;
};

// Reuses the same four category colors instead of introducing new tokens —
// pattern/cobalt, warning/amber, lifestyleCreep/plum, goalAlert/teal.
export const insightMeta: Record<
  InsightType,
  { label: string; icon: typeof Bell; colors: { fg: string; bg: string } }
> = {
  pattern: { label: "Pattern", icon: Activity, colors: theme.category.transport },
  warning: { label: "Warning", icon: Bell, colors: theme.category.food },
  lifestyleCreep: {
    label: "Lifestyle",
    icon: TrendingUp,
    colors: theme.category.subscriptions
  },
  goalAlert: { label: "Goal", icon: Target, colors: theme.category.income }
};

// Shaped like GET /insights from spec §7 — swap for the real query result.
export const mockInsights: Insight[] = [
  {
    id: "1",
    type: "pattern",
    timestampLabel: "2d ago",
    body: "You've spent €47 on coffee this month — up 60% from July. At this pace, that's €564 a year."
  },
  {
    id: "2",
    type: "warning",
    timestampLabel: "1d ago",
    body: "3 subscriptions renew in the next 7 days totalling €34. You haven't used 2 of them this month."
  },
  {
    id: "3",
    type: "lifestyleCreep",
    timestampLabel: "4d ago",
    body: "Your weekend spending has crept up €60/month for 3 months straight — mostly dining out."
  },
  {
    id: "4",
    type: "goalAlert",
    timestampLabel: "Today",
    body: "Your Emergency fund goal is on track! At €150/month you'll reach €3,000 by December."
  }
];

// Weekly 50/30/20 split shown at the bottom of Insights.
export const mockSplit = { needs: 52, wants: 28, saved: 20 };
