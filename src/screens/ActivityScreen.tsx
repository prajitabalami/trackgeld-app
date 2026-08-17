import { Camera, ChevronLeft, ChevronRight, Search } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { categoryMeta } from "../data/categories";
import { Transaction, TransactionGroup } from "../data/transactions";
import { FAB } from "../components/FAB";
import { PillTabBar, TabKey } from "../components/PillTabBar";
import { theme } from "../theme/theme";

type ActivityScreenProps = {
  groups: TransactionGroup[];
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  onAddTransaction: () => void;
  onSelectTransaction: (transaction: Transaction) => void;
};

export function ActivityScreen({
  groups,
  activeTab,
  onChangeTab,
  onAddTransaction,
  onSelectTransaction
}: ActivityScreenProps) {
  return (
    <View style={styles.wrap}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Activity</Text>
          <View style={styles.headerIcons}>
            <Search color={theme.colors.text} size={17} />
            <Camera color={theme.colors.text} size={17} />
          </View>
        </View>

        <View style={styles.monthRow}>
          <ChevronLeft color={theme.colors.text} size={16} />
          <Text style={styles.monthLabel}>August 2026</Text>
          <ChevronRight color={theme.colors.text} size={16} />
        </View>

        {groups.map((group) => (
          <View key={group.label}>
            <Text style={styles.groupLabel}>{group.label}</Text>
            {group.items.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                onPress={() => onSelectTransaction(transaction)}
                transaction={transaction}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      <FAB onPress={onAddTransaction} />
      <PillTabBar active={activeTab} onChange={onChangeTab} />
    </View>
  );
}

function TransactionRow({
  transaction,
  onPress
}: {
  transaction: Transaction;
  onPress: () => void;
}) {
  const meta = categoryMeta[transaction.category];
  const colors = theme.category[transaction.category];
  const Icon = meta.icon;
  const isPositive = transaction.amount > 0;
  const amountLabel = `${isPositive ? "+" : "-"}€${Math.abs(transaction.amount).toFixed(2)}`;

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: colors.bg }]}>
        <Icon color={colors.fg} size={16} strokeWidth={2.2} />
      </View>
      <View style={styles.rowMeta}>
        <Text numberOfLines={1} style={styles.rowName}>
          {transaction.name}
        </Text>
        <Text style={styles.rowSub}>
          {meta.label} · {transaction.timeLabel}
        </Text>
      </View>
      <Text style={[styles.rowAmount, isPositive && styles.rowAmountPositive]}>
        {amountLabel}
      </Text>
    </Pressable>
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
    gap: theme.spacing.sm
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 5,
    fontFamily: theme.fontFamily.bold
  },
  headerIcons: {
    flexDirection: "row",
    gap: theme.spacing.md
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xs
  },
  monthLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontFamily: theme.fontFamily.bold
  },
  groupLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.label,
    fontFamily: theme.fontFamily.bold,
    marginTop: theme.spacing.xs,
    marginBottom: 2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    paddingVertical: 8
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.sm + 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowMeta: {
    flex: 1,
    minWidth: 0
  },
  rowName: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold
  },
  rowSub: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label - 1,
    marginTop: 1
  },
  rowAmount: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold
  },
  rowAmountPositive: {
    color: theme.colors.primary
  }
});
