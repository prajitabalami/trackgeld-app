import { StyleSheet, Text, TextInput, View } from "react-native";

import { theme } from "../theme/theme";

type AmountInputProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function AmountInput({ value, onChangeText }: AmountInputProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.sign}>€</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder="0.00"
        placeholderTextColor={theme.colors.textFaint}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    paddingVertical: theme.spacing.xs
  },
  sign: {
    color: theme.colors.primary,
    fontSize: 24,
    marginRight: 3,
    fontFamily: theme.fontFamily.bold
  },
  input: {
    color: theme.colors.primary,
    fontSize: 30,
    minWidth: 100,
    textAlign: "center",
    padding: 0,
    fontFamily: theme.fontFamily.bold
  }
});
