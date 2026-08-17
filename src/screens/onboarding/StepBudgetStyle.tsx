import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { SelectableCard } from "../../components/SelectableCard";
import { theme } from "../../theme/theme";
import { BudgetStyle } from "./types";

type StepBudgetStyleProps = {
  budgetStyle: BudgetStyle;
  onNext: (budgetStyle: BudgetStyle) => void;
};

export function StepBudgetStyle({ budgetStyle, onNext }: StepBudgetStyleProps) {
  const [selected, setSelected] = useState<BudgetStyle>(budgetStyle);

  return (
    <View style={styles.wrap}>
      <View style={styles.body}>
        <Text style={styles.title}>How do you want to manage your budget?</Text>

        <SelectableCard
          badge="Recommended"
          description="50% needs, 30% wants, 20% savings — split automatically from your income. We adjust the split if you go over."
          onPress={() => setSelected("50-30-20")}
          selected={selected === "50-30-20"}
          title="50/30/20"
        />
        <SelectableCard
          description="Set your own spending limit per category. We track against your limits and alert you when you're close."
          onPress={() => setSelected("custom")}
          selected={selected === "custom"}
          title="Custom budgets"
        />
      </View>

      <AppButton onPress={() => onNext(selected)} title="Continue" />
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
    gap: theme.spacing.sm
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 4,
    fontFamily: theme.fontFamily.bold,
    lineHeight: 26,
    marginBottom: theme.spacing.xs
  }
});
