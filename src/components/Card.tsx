import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { theme } from "../theme/theme";

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** 2px accent border, used for the selected state in onboarding cards. */
  selected?: boolean;
};

export function Card({ children, style, selected = false }: CardProps) {
  return (
    <View style={[styles.card, selected && styles.selected, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    ...theme.shadow
  },
  selected: {
    borderWidth: 2,
    borderColor: theme.colors.primary
  }
});
