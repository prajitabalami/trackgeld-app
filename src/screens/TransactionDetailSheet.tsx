import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { BottomSheet } from "../components/BottomSheet";
import { categoryMeta } from "../data/categories";
import { Transaction } from "../data/transactions";
import { theme } from "../theme/theme";

type TransactionDetailSheetProps = {
  transaction: Transaction | null;
  onClose: () => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

export function TransactionDetailSheet({
  transaction,
  onClose,
  onEdit,
  onDelete
}: TransactionDetailSheetProps) {
  return (
    <BottomSheet onClose={onClose} visible={Boolean(transaction)}>
      {transaction ? (
        <TransactionDetailBody
          onDelete={onDelete}
          onEdit={onEdit}
          transaction={transaction}
        />
      ) : (
        // Modal content can briefly re-render as it animates closed, after
        // `transaction` has already been cleared — render nothing rather
        // than crash on missing data.
        <View />
      )}
    </BottomSheet>
  );
}

function TransactionDetailBody({
  transaction,
  onEdit,
  onDelete
}: {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}) {
  const meta = categoryMeta[transaction.category];
  const colors = theme.category[transaction.category];
  const Icon = meta.icon;
  const isPositive = transaction.amount > 0;
  const amountLabel = `${isPositive ? "+" : "-"}€${Math.abs(transaction.amount).toFixed(2)}`;

  return (
    <>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.bg }]}>
          <Icon color={colors.fg} size={20} strokeWidth={2.2} />
        </View>
        <Text style={[styles.amount, isPositive && styles.amountPositive]}>
          {amountLabel}
        </Text>
      </View>
      <Text style={styles.name}>{transaction.name}</Text>

      <View style={styles.detailCard}>
        <DetailRow label="Category" value={meta.label} />
        <DetailRow label="Date" value={transaction.dateLabel} />
        {transaction.note ? (
          <DetailRow label="Note" value={transaction.note} />
        ) : null}
      </View>

      <View style={styles.actions}>
        <View style={styles.actionHalf}>
          <AppButton
            onPress={() => onEdit(transaction)}
            title="Edit"
            variant="secondary"
          />
        </View>
        <View style={styles.actionHalf}>
          <AppButton
            onPress={() => onDelete(transaction)}
            title="Delete"
            variant="danger"
          />
        </View>
      </View>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center"
  },
  amount: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "800"
  },
  amountPositive: {
    color: theme.colors.primary
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: -4
  },
  detailCard: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 9
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label + 1.5
  },
  detailValue: {
    color: theme.colors.text,
    fontSize: theme.typography.label + 1.5,
    fontWeight: "700"
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  actionHalf: {
    flex: 1
  }
});
