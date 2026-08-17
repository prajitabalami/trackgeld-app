import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { AppTextInput } from "../../components/AppTextInput";
import { SelectField } from "../../components/SelectField";
import { theme } from "../../theme/theme";

type GoalValues = {
  goalName: string;
  goalTarget: string;
  goalDeadline: string;
  goalMonthly: string;
};

type StepGoalProps = {
  initial: GoalValues;
  onNext: (values: GoalValues) => void;
  onSkip: () => void;
};

export function StepGoal({ initial, onNext, onSkip }: StepGoalProps) {
  const [goalName, setGoalName] = useState(initial.goalName);
  const [goalTarget, setGoalTarget] = useState(initial.goalTarget);
  const [goalMonthly, setGoalMonthly] = useState(initial.goalMonthly);
  // Deadline uses a month/year picker in the real app (native picker or a
  // sheet) — wire onPress on the SelectField below to whichever you use.
  const [goalDeadline] = useState(initial.goalDeadline || "Dec 2026");

  return (
    <View style={styles.wrap}>
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>What are you saving for?</Text>
            <Text style={styles.subtitle}>
              Setting a goal gives your savings a purpose. You can add more
              later.
            </Text>
          </View>
          <Text onPress={onSkip} style={styles.skip}>
            Skip
          </Text>
        </View>

        <AppTextInput
          label="Goal name"
          onChangeText={setGoalName}
          placeholder="e.g. Emergency fund, Holiday, New laptop"
          value={goalName}
        />
        <View style={styles.row}>
          <View style={styles.half}>
            <AppTextInput
              keyboardType="decimal-pad"
              label="Target amount"
              onChangeText={setGoalTarget}
              placeholder="3,000"
              value={goalTarget}
            />
          </View>
          <View style={styles.half}>
            <SelectField label="Deadline" value={goalDeadline} />
          </View>
        </View>
        <AppTextInput
          keyboardType="decimal-pad"
          label="Monthly allocation"
          onChangeText={setGoalMonthly}
          placeholder="How much can you set aside each month?"
          value={goalMonthly}
        />
      </View>

      <AppButton
        onPress={() =>
          onNext({ goalName, goalTarget, goalDeadline, goalMonthly })
        }
        title="Continue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl
  },
  body: {
    gap: theme.spacing.md
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  copy: {
    flex: 1,
    gap: 6,
    paddingRight: theme.spacing.sm
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 4,
    fontFamily: theme.fontFamily.bold,
    lineHeight: 26
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small + 1,
    lineHeight: 20,
    fontFamily: theme.fontFamily.regular
  },
  skip: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold,
    marginTop: 2
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  half: {
    flex: 1
  }
});
