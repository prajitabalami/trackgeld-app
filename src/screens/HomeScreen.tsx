import { ScrollView, StyleSheet, Text, View } from "react-native";

import { CategoryRow } from "../components/CategoryRow";
import { MetricCard } from "../components/MetricCard";
import { PillTabBar, TabKey } from "../components/PillTabBar";
import { RingProgress } from "../components/RingProgress";
import { theme } from "../theme/theme";

type HomeScreenProps = {
  name: string;
  monthlyIncome: number;
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

// Demo data shaped like the GET /transactions/summary + GET /budget
// response described in spec §5.2 — swap for the real query result.
const spend = {
  totalSpent: 1240,
  budget: 2100,
  categories: [
    { key: "food" as const, amount: 380, percentOfLimit: 76 },
    { key: "transport" as const, amount: 210, percentOfLimit: 42 },
    { key: "subscriptions" as const, amount: 95, percentOfLimit: 95 }
  ]
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomeScreen({
  name,
  monthlyIncome,
  activeTab,
  onChangeTab
}: HomeScreenProps) {
  const remaining = monthlyIncome - spend.totalSpent;
  const usedRatio = spend.budget > 0 ? spend.totalSpent / spend.budget : 0;
  const usedPercent = Math.round(usedRatio * 100);

  // Spec §5.3.2 — bar/ring colour shifts at the 80% and 100% thresholds.
  const ringColor =
    usedRatio >= 1
      ? theme.colors.danger
      : usedRatio >= 0.8
      ? theme.colors.warning
      : theme.colors.primary;

  const monthLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.wrap}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {greeting()}, {name}
            </Text>
            <Text style={styles.date}>{monthLabel}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>

        <View style={styles.ringCard}>
          <RingProgress
            centerLabel={`€${spend.totalSpent.toLocaleString()}`}
            centerSubLabel={`of €${spend.budget.toLocaleString()}`}
            color={ringColor}
            progress={usedRatio}
            size={150}
            strokeWidth={15}
          />
          <Text style={[styles.ringCaption, { color: ringColor }]}>
            {usedPercent}% of monthly budget
          </Text>
        </View>

        <View style={styles.statRow}>
          <MetricCard
            label="Remaining"
            value={`€${Math.abs(remaining).toLocaleString()}`}
            valueColor={remaining >= 0 ? theme.colors.primary : theme.colors.danger}
          />
          <MetricCard label="Saved" value="€150" />
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Spending by category</Text>
          {spend.categories.map((category) => (
            <CategoryRow
              amountLabel={`€${category.amount}`}
              category={category.key}
              key={category.key}
              percentOfLimit={category.percentOfLimit}
            />
          ))}
        </View>
      </ScrollView>

      <PillTabBar active={activeTab} onChange={onChangeTab} />
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
    gap: theme.spacing.md
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  greeting: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold
  },
  date: {
    color: theme.colors.text,
    fontSize: theme.typography.body - 1,
    fontFamily: theme.fontFamily.bold,
    marginTop: 2
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 }
  },
  avatarText: {
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.bold,
    fontSize: 12
  },
  ringCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xxl,
    alignItems: "center",
    ...theme.shadow
  },
  ringCaption: {
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold,
    marginTop: theme.spacing.xs
  },
  statRow: {
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  categorySection: {
    gap: 0
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontFamily: theme.fontFamily.bold,
    marginBottom: theme.spacing.sm
  }
});
