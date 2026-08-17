import { Text, TextInput, TextInputProps, StyleSheet, View } from "react-native";

import { theme } from "../theme/theme";

type AppTextInputProps = TextInputProps & {
  label: string;
};

export function AppTextInput({ label, style, ...props }: AppTextInputProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: theme.spacing.xs
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    textTransform: "uppercase",
    fontFamily: theme.fontFamily.bold
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontFamily: theme.fontFamily.regular
  }
});

