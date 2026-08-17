import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from "react-native";

import { theme } from "../theme/theme";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  /** Optional leading element, e.g. a provider icon on the Google button. */
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  icon,
  style
}: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style
      ]}
    >
      <View style={styles.row}>
        {icon}
        <Text style={[styles.label, LABEL_COLOR[variant]]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const LABEL_COLOR = StyleSheet.create({
  primary: { color: theme.colors.white },
  secondary: { color: theme.colors.text },
  ghost: { color: theme.colors.text },
  danger: { color: theme.colors.danger }
});

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.lg
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  primary: {
    backgroundColor: theme.colors.primary
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    shadowColor: "#14201A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  danger: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: theme.category.health.bg // coral-tint
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    backgroundColor: theme.colors.primaryPressed
  },
  label: {
    fontSize: theme.typography.body,
    fontFamily: theme.fontFamily.bold
  }
});
