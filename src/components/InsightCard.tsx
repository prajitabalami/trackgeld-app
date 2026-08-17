import { X } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Insight, insightMeta } from "../data/insights";
import { theme } from "../theme/theme";

type InsightCardProps = {
  insight: Insight;
  onDismiss: (id: string) => void;
};

export function InsightCard({ insight, onDismiss }: InsightCardProps) {
  const meta = insightMeta[insight.type];
  const Icon = meta.icon;

  return (
    <View style={[styles.card, { backgroundColor: meta.colors.bg }]}>
      <View style={styles.top}>
        <View style={styles.typeRow}>
          <Icon color={meta.colors.fg} size={13} strokeWidth={2.4} />
          <Text style={[styles.type, { color: meta.colors.fg }]}>
            {meta.label} · {insight.timestampLabel}
          </Text>
        </View>
        <Pressable hitSlop={10} onPress={() => onDismiss(insight.id)}>
          <X color={meta.colors.fg} size={14} />
        </Pressable>
      </View>
      <Text style={styles.body}>{insight.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  type: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.3
  },
  body: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    lineHeight: 18,
    marginTop: 7
  }
});
