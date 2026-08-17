import { ChevronDown } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type SelectFieldProps = {
  label: string;
  value: string;
  onPress?: () => void;
};

export function SelectField({ label, value, onPress }: SelectFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.field, pressed && styles.pressed]}
      >
        <Text style={styles.value}>{value}</Text>
        <ChevronDown color={theme.colors.textMuted} size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 5
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    fontFamily: theme.fontFamily.bold,
    textTransform: "uppercase"
  },
  field: {
    minHeight: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 }
  },
  pressed: {
    opacity: 0.7
  },
  value: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontFamily: theme.fontFamily.semiBold
  }
});
