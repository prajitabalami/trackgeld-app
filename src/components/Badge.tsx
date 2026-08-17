import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";
import { GoalStatus } from "../data/goals";

const STATUS_META: Record<
  GoalStatus,
  { label: string; colors: { fg: string; bg: string } }
> = {
  onTrack: { label: "On track", colors: theme.category.income }, // teal
  behind: { label: "Behind", colors: theme.category.food }, // amber
  completed: { label: "Completed ✓", colors: theme.category.transport } // cobalt
};

type BadgeProps = {
  status: GoalStatus;
};

export function Badge({ status }: BadgeProps) {
  const meta = STATUS_META[status];
  return (
    <View style={[styles.pill, { backgroundColor: meta.colors.bg }]}>
      <Text style={[styles.label, { color: meta.colors.fg }]}>
        {meta.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: theme.radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3
  },
  label: {
    fontSize: 9,
    fontFamily: theme.fontFamily.bold,
    textTransform: "uppercase",
    letterSpacing: 0.3
  }
});
