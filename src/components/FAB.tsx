import { Plus } from "lucide-react-native";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { theme } from "../theme/theme";

type FABProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function FAB({ onPress, style }: FABProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.pressed, style]}
    >
      <Plus color={theme.colors.white} size={21} strokeWidth={2.6} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 82,
    width: 50,
    height: 50,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primaryPressed,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 6
  },
  pressed: {
    opacity: 0.85
  }
});
