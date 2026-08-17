import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type MetricCardProps = {
  label: string;
  value: string;
  note?: string;
  valueColor?: string;
};

export function MetricCard({ label, value, note, valueColor }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 142,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    ...theme.shadow
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  value: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: theme.spacing.sm
  },
  note: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    lineHeight: 18,
    marginTop: theme.spacing.xs
  }
});

