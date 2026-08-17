import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { Card } from "../../components/Card";
import { theme } from "../../theme/theme";
import { OnboardingData } from "./types";

type StepSummaryProps = {
  data: OnboardingData;
  onLaunch: () => void;
};

export function StepSummary({ data, onLaunch }: StepSummaryProps) {
  const income = Number(data.monthlyIncome) || 0;
  const goalMonthly = Number(data.goalMonthly) || 0;
  const estimatedSavings =
    data.budgetStyle === "50-30-20" ? income * 0.2 : goalMonthly;

  return (
    <View style={styles.wrap}>
      <View style={styles.body}>
        <Text style={styles.title}>You're all set, {data.name}!</Text>

        <Card style={{ gap: theme.spacing.sm }}>
          <Row label="Monthly income" value={`€${income.toLocaleString()}`} />
          <Row
            label="Budget style"
            value={data.budgetStyle === "50-30-20" ? "50/30/20" : "Custom"}
          />
          {data.goalName ? (
            <Row label="First goal" value={data.goalName} />
          ) : null}
          <View style={styles.divider} />
          <Row
            emphasize
            label="Est. savings / month"
            value={`€${estimatedSavings.toLocaleString()}`}
          />
        </Card>
      </View>

      <AppButton onPress={onLaunch} title="Open Claros →" />
    </View>
  );
}

function Row({
  label,
  value,
  emphasize = false
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, emphasize && styles.rowValueEmphasis]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl
  },
  body: {
    gap: theme.spacing.lg
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading,
    fontWeight: "800",
    lineHeight: 30
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small + 1
  },
  rowValue: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontWeight: "800"
  },
  rowValueEmphasis: {
    color: theme.colors.primary,
    fontSize: theme.typography.body
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border
  }
});
