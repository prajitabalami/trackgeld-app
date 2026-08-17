import {
  Coffee,
  DollarSign,
  Heart,
  MoreHorizontal,
  Repeat,
  ShoppingBag,
  Truck
} from "lucide-react-native";

import { CategoryKey } from "../theme/theme";

export const categoryMeta: Record<
  CategoryKey,
  { label: string; icon: typeof Coffee }
> = {
  food: { label: "Food & drink", icon: Coffee },
  transport: { label: "Transport", icon: Truck },
  subscriptions: { label: "Subscriptions", icon: Repeat },
  shopping: { label: "Shopping", icon: ShoppingBag },
  health: { label: "Health", icon: Heart },
  income: { label: "Income", icon: DollarSign },
  other: { label: "Other", icon: MoreHorizontal }
};
