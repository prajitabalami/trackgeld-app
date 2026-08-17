import { SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { InsightCard } from "../components/InsightCard";
import { PillTabBar, TabKey } from "../components/PillTabBar";
import { mockInsights, mockSplit } from "../data/insights";
import { theme } from "../theme/theme";

type InsightsScreenProps = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

const SPLIT_COLOR = {
  needs: theme.category.food.fg, // amber
  wants: theme.category.subscriptions.fg, // plum
  saved: theme.category.income.fg // teal
};

export function InsightsScreen({ activeTab, onChangeTab }: InsightsScreenProps) {
  const [insights, setInsights] = useState(mockInsights);

  return (
    <View style={styles.wrap}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Insights</Text>
            <Text style={styles.subtitle}>Week of Aug 4 – 10</Text>
          </View>
          <SlidersHorizontal color={theme.colors.text} size={18} />
        </View>

        <View style={styles.list}>
          {insights.map((insight) => (
            <InsightCard
              insight={insight}
              key={insight.id}
              onDismiss={(id) =>
                setInsights((prev) => prev.filter((item) => item.id !== id))
              }
            />
          ))}
          {insights.length === 0 ? (
            <Text style={styles.empty}>
              You're all caught up — new insights land here as they're
              generated.
            </Text>
          ) : null}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Your 50/30/20 this month</Text>
          <View style={styles.splitRow}>
            <SplitStat label="Needs" value={mockSplit.needs} color={SPLIT_COLOR.needs} />
            <SplitStat label="Wants" value={mockSplit.wants} color={SPLIT_COLOR.wants} />
            <SplitStat label="Saved" value={mockSplit.saved} color={SPLIT_COLOR.saved} />
          </View>
          <View style={styles.barStack}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: "100%", backgroundColor: SPLIT_COLOR.needs }]} />
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: "93%", backgroundColor: SPLIT_COLOR.wants }]} />
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: "100%", backgroundColor: SPLIT_COLOR.saved }]} />
            </View>
          </View>
        </View>
      </ScrollView>

      <PillTabBar active={activeTab} onChange={onChangeTab} />
    </View>
  );
}

function SplitStat({
  label,
  value,
  color
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View style={styles.splitStat}>
      <Text style={[styles.splitValue, { color }]}>{value}%</Text>
      <Text style={styles.splitLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 96,
    gap: theme.spacing.lg
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 5,
    fontWeight: "800"
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    marginTop: 2
  },
  list: {
    gap: theme.spacing.sm
  },
  empty: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    textAlign: "center",
    paddingVertical: theme.spacing.lg
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontWeight: "800",
    marginBottom: theme.spacing.sm
  },
  splitRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  splitStat: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    alignItems: "center"
  },
  splitValue: {
    fontSize: 14,
    fontWeight: "800"
  },
  splitLabel: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
    marginTop: 2
  },
  barStack: {
    gap: 5
  },
  track: {
    height: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: theme.radius.pill
  }
});
