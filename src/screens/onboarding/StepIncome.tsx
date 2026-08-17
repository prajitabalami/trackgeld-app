import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { Card } from "../../components/Card";
import { Segmented } from "../../components/Segmented";
import { SelectField } from "../../components/SelectField";
import { theme } from "../../theme/theme";
import { IncomeType } from "./types";

type StepIncomeProps = {
  currency: string;
  monthlyIncome: string;
  incomeType: IncomeType;
  onNext: (values: { monthlyIncome: string; incomeType: IncomeType }) => void;
};

const INCOME_OPTIONS: { label: string; value: IncomeType }[] = [
  { label: "Regular", value: "regular" },
  { label: "Freelance", value: "freelance" },
  { label: "Mixed", value: "mixed" }
];

export function StepIncome({
  currency,
  monthlyIncome,
  incomeType,
  onNext
}: StepIncomeProps) {
  const [amount, setAmount] = useState(monthlyIncome);
  const [type, setType] = useState<IncomeType>(incomeType);
  // Spec §4.2: this step cannot be skipped or submitted with 0.
  const canContinue = Number(amount) > 0;

  return (
    <View style={styles.wrap}>
      <View style={styles.body}>
        <View style={styles.copy}>
          <Text style={styles.title}>How much do you earn each month?</Text>
          <Text style={styles.subtitle}>
            This is your after-tax take-home pay. We use this to calculate
            your budget and savings rate.
          </Text>
        </View>

        <SelectField label="Currency" value={`${currency} — €`} />

        <Card style={styles.amountCard}>
          <View style={styles.amountRow}>
            <Text style={styles.currencySign}>€</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={theme.colors.textFaint}
              style={styles.amountInput}
              value={amount}
            />
          </View>
          <Text style={styles.amountLabel}>Monthly take-home pay</Text>
        </Card>
        {!canContinue && amount.length > 0 ? (
          <Text style={styles.error}>Amount must be greater than zero.</Text>
        ) : null}

        <Segmented onChange={setType} options={INCOME_OPTIONS} value={type} />
      </View>

      <AppButton
        disabled={!canContinue}
        onPress={() => onNext({ monthlyIncome: amount, incomeType: type })}
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
  copy: {
    gap: 6
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 4,
    fontWeight: "800",
    lineHeight: 26
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small + 1,
    lineHeight: 20
  },
  amountCard: {
    alignItems: "center",
    paddingVertical: theme.spacing.lg
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  currencySign: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: "800",
    marginRight: 4
  },
  amountInput: {
    color: theme.colors.primary,
    fontSize: 34,
    fontWeight: "800",
    minWidth: 140,
    padding: 0
  },
  amountLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    marginTop: 4
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.typography.label,
    fontWeight: "700",
    marginTop: -theme.spacing.sm
  }
});
