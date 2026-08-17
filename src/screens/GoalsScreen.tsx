import { Plus } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { GoalCard } from "../components/GoalCard";
import { PillTabBar, TabKey } from "../components/PillTabBar";
import { Goal } from "../data/goals";
import { theme } from "../theme/theme";

type GoalsScreenProps = {
  goals: Goal[];
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  onAddGoal: () => void;
};

export function GoalsScreen({
  goals,
  activeTab,
  onChangeTab,
  onAddGoal
}: GoalsScreenProps) {
  const autoAllocated = goals
    .filter((goal) => goal.status !== "completed")
    .reduce((sum, goal) => sum + goal.monthlyAllocation, 0);

  return (
    <View style={styles.wrap}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Goals</Text>
            <Text style={styles.subtitle}>
              Auto-allocating €{autoAllocated}/month from income
            </Text>
          </View>
          <AppButton
            icon={<Plus color={theme.colors.text} size={13} />}
            onPress={onAddGoal}
            style={styles.addButton}
            title="Add"
            variant="secondary"
          />
        </View>

        <View style={styles.list}>
          {goals.map((goal) => (
            <GoalCard goal={goal} key={goal.id} />
          ))}
        </View>
      </ScrollView>

      <PillTabBar active={activeTab} onChange={onChangeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 96,
    gap: theme.spacing.md
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing.sm
  },
  headerCopy: {
    flex: 1
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 5,
    fontWeight: "800"
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    marginTop: 2
  },
  addButton: {
    minHeight: 36,
    paddingHorizontal: theme.spacing.md
  },
  list: {
    gap: theme.spacing.md
  }
});
