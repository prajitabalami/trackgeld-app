import { StyleSheet, Text, View } from "react-native";

import { categoryMeta } from "../data/categories";
import { CategoryKey, theme } from "../theme/theme";

type CategoryRowProps = {
  category: CategoryKey;
  amountLabel: string;
  /** Share of the category's own budget limit, 0–100. Drives the bar width. */
  percentOfLimit: number;
};

export function CategoryRow({
  category,
  amountLabel,
  percentOfLimit
}: CategoryRowProps) {
  const meta = categoryMeta[category];
  const colors = theme.category[category];
  const Icon = meta.icon;
  const width = `${Math.max(0, Math.min(100, percentOfLimit))}%` as const;

  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: colors.bg }]}>
          <Icon color={colors.fg} size={15} strokeWidth={2.2} />
        </View>
        <Text style={styles.name}>{meta.label}</Text>
        <Text style={styles.amount}>{amountLabel}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width, backgroundColor: colors.fg }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: theme.spacing.sm
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: 6
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold
  },
  amount: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.bold
  },
  track: {
    height: 8,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
    overflow: "hidden",
    marginLeft: 40
  },
  fill: {
    height: "100%",
    borderRadius: theme.radius.pill
  }
});
