import { StyleSheet, Text, View } from "react-native";

import { Badge } from "./Badge";
import { Card } from "./Card";
import { Goal } from "../data/goals";
import { theme } from "../theme/theme";

type GoalCardProps = {
  goal: Goal;
};

const BAR_COLOR: Record<Goal["status"], string> = {
  onTrack: theme.category.income.fg, // teal
  behind: theme.category.food.fg, // amber
  completed: theme.category.transport.fg // cobalt
};

export function GoalCard({ goal }: GoalCardProps) {
  const percent = goal.targetAmount > 0
    ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
    : 0;

  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{goal.title}</Text>
        <Badge status={goal.status} />
      </View>
      {goal.status !== "completed" ? (
        <Text style={styles.deadline}>{goal.deadlineLabel}</Text>
      ) : null}
      <Text style={styles.amount}>
        €{goal.currentAmount.toLocaleString()}{" "}
        <Text style={styles.amountMuted}>
          of €{goal.targetAmount.toLocaleString()}
        </Text>
      </Text>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percent}%`, backgroundColor: BAR_COLOR[goal.status] }
          ]}
        />
      </View>
      {goal.status === "behind" && goal.catchUpNote ? (
        <Text style={[styles.note, { color: BAR_COLOR.behind }]}>
          {goal.catchUpNote}
        </Text>
      ) : goal.status === "onTrack" ? (
        <Text style={styles.note}>
          €{goal.monthlyAllocation}/month allocated automatically
        </Text>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontFamily: theme.fontFamily.bold
  },
  deadline: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    marginTop: -6
  },
  amount: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontFamily: theme.fontFamily.bold
  },
  amountMuted: {
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.semiBold
  },
  track: {
    height: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: theme.radius.pill
  },
  note: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    fontFamily: theme.fontFamily.bold
  }
});
