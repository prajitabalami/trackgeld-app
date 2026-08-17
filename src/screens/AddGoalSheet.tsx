import { CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppTextInput } from "../components/AppTextInput";
import { BottomSheet } from "../components/BottomSheet";
import { SelectField } from "../components/SelectField";
import { theme } from "../theme/theme";

type AddGoalSheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Income left over after every other goal's monthly allocation. */
  remainingBeforeThisGoal: number;
  onSave: (goal: {
    name: string;
    targetAmount: number;
    monthlyAllocation: number;
  }) => void;
};

export function AddGoalSheet({
  visible,
  onClose,
  remainingBeforeThisGoal,
  onSave
}: AddGoalSheetProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [monthly, setMonthly] = useState("");

  const monthlyNumber = Number(monthly) || 0;
  const remainingAfter = remainingBeforeThisGoal - monthlyNumber;
  const canAfford = remainingAfter >= 0;

  const canSave = name.trim().length > 0 && Number(target) > 0 && monthlyNumber > 0;

  function handleSave() {
    onSave({
      name,
      targetAmount: Number(target),
      monthlyAllocation: monthlyNumber
    });
    setName("");
    setTarget("");
    setMonthly("");
  }

  return (
    <BottomSheet onClose={onClose} title="Add goal" visible={visible}>
      <AppTextInput
        label="Goal name"
        onChangeText={setName}
        placeholder="e.g. New laptop"
        value={name}
      />
      <View style={styles.row}>
        <View style={styles.half}>
          <AppTextInput
            keyboardType="decimal-pad"
            label="Target amount"
            onChangeText={setTarget}
            placeholder="1,000"
            value={target}
          />
        </View>
        <View style={styles.half}>
          {/* Wire onPress to a native month/year picker in the real app. */}
          <SelectField label="Deadline" value="Month / year" />
        </View>
      </View>
      <AppTextInput
        keyboardType="decimal-pad"
        label="Monthly allocation"
        onChangeText={setMonthly}
        placeholder="85"
        value={monthly}
      />

      {monthlyNumber > 0 ? (
        <View
          style={[
            styles.affordability,
            { backgroundColor: canAfford ? theme.category.income.bg : theme.category.health.bg }
          ]}
        >
          <CheckCircle2
            color={canAfford ? theme.category.income.fg : theme.category.health.fg}
            size={14}
          />
          <Text
            style={[
              styles.affordabilityText,
              { color: canAfford ? theme.category.income.fg : theme.category.health.fg }
            ]}
          >
            {canAfford
              ? `You can afford this — €${remainingAfter.toLocaleString()} remaining after all goals.`
              : `That's €${Math.abs(remainingAfter).toLocaleString()} more than you have left after your other goals.`}
          </Text>
        </View>
      ) : null}

      <AppButton disabled={!canSave} onPress={handleSave} title="Save goal" />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  half: {
    flex: 1
  },
  affordability: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm
  },
  affordabilityText: {
    flex: 1,
    fontSize: theme.typography.label,
    fontFamily: theme.fontFamily.bold
  }
});
