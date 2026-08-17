import { CategoryKey } from "../theme/theme";

export type TransactionType = "expense" | "income" | "borrowed" | "lent";

export type Transaction = {
  id: string;
  name: string;
  category: CategoryKey;
  amount: number;
  type: TransactionType;
  timeLabel: string;
  dateLabel: string;
  note?: string;
};

export type TransactionGroup = {
  label: string;
  items: Transaction[];
};

// Shaped like GET /transactions from spec §5.4 — swap for the real query
// result, which already comes back grouped by day.
export const mockTransactionGroups: TransactionGroup[] = [
  {
    label: "Today",
    items: [
      {
        id: "t1",
        name: "Café Central",
        category: "food",
        amount: -4.8,
        type: "expense",
        timeLabel: "8:42 AM",
        dateLabel: "Aug 7, 8:42 AM",
        note: "Flat white before work"
      },
      {
        id: "t2",
        name: "DB Navigator",
        category: "transport",
        amount: -3.2,
        type: "expense",
        timeLabel: "7:55 AM",
        dateLabel: "Aug 7, 7:55 AM"
      }
    ]
  },
  {
    label: "Yesterday",
    items: [
      {
        id: "t3",
        name: "Salary",
        category: "income",
        amount: 2100,
        type: "income",
        timeLabel: "9:00 AM",
        dateLabel: "Aug 6, 9:00 AM"
      },
      {
        id: "t4",
        name: "Spotify",
        category: "subscriptions",
        amount: -10.99,
        type: "expense",
        timeLabel: "6:10 PM",
        dateLabel: "Aug 6, 6:10 PM"
      }
    ]
  }
];
