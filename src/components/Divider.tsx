import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type DividerProps = {
  label: string;
};

export function Divider({ label }: DividerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    fontWeight: "600"
  }
});
