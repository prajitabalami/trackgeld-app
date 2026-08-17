import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AmountInput } from "../components/AmountInput";
import { AppButton } from "../components/AppButton";
import { AppTextInput } from "../components/AppTextInput";
import { BottomSheet } from "../components/BottomSheet";
import { CategoryPicker } from "../components/CategoryPicker";
import { Segmented } from "../components/Segmented";
import { SelectField } from "../components/SelectField";
import { CategoryKey, theme } from "../theme/theme";
import { TransactionType } from "../data/transactions";

type AddTransactionSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (transaction: {
    name: string;
    amount: number;
    type: TransactionType;
    category: CategoryKey;
  }) => void;
};

const TYPE_OPTIONS: { label: string; value: TransactionType }[] = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
  { label: "Borrowed", value: "borrowed" },
  { label: "Lent", value: "lent" }
];

// Top categories shown in the quick-pick grid; "Other" covers the rest.
const QUICK_CATEGORIES: CategoryKey[] = [
  "food",
  "transport",
  "subscriptions",
  "shopping"
];

export function AddTransactionSheet({
  visible,
  onClose,
  onSave
}: AddTransactionSheetProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<CategoryKey>("food");

  const canSave = name.trim().length > 0 && Number(amount) > 0;

  function handleSave() {
    onSave({ name, amount: Number(amount), type, category });
    setName("");
    setAmount("");
    setType("expense");
    setCategory("food");
  }

  return (
    <BottomSheet onClose={onClose} title="Add transaction" visible={visible}>
      <AppTextInput
        label="Name"
        onChangeText={setName}
        placeholder="What did you spend on?"
        value={name}
      />

      <AmountInput onChangeText={setAmount} value={amount} />

      <Segmented onChange={setType} options={TYPE_OPTIONS} value={type} />

      <View>
        <CategoryPicker
          categories={QUICK_CATEGORIES}
          onSelect={setCategory}
          selected={category}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.half}>
          <SelectField label="Date" value="Today" />
        </View>
        <View style={styles.half}>
          {/* Wire onPress to expo-image-picker / camera in the real app. */}
          <SelectField
            label="Receipt"
            value="Add photo"
          />
        </View>
      </View>

      <AppButton disabled={!canSave} onPress={handleSave} title="Save transaction" />
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
  }
});
