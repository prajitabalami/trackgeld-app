import { Check } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type SelectableCardProps = {
  title: string;
  badge?: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectableCard({
  title,
  badge,
  description,
  selected,
  onPress
}: SelectableCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <View style={[styles.card, selected && styles.selected]}>
        <View style={[styles.radio, selected && styles.radioOn]}>
          {selected ? <Check color={theme.colors.white} size={12} strokeWidth={3} /> : null}
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>
            {title}
            {badge ? <Text style={styles.badge}>  {badge}</Text> : null}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: "transparent",
    ...theme.shadow
  },
  selected: {
    borderColor: theme.colors.primary
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.pill,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1
  },
  radioOn: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  copy: {
    flex: 1
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.small + 1,
    fontWeight: "800"
  },
  badge: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label,
    fontWeight: "700"
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.label + 1.5,
    lineHeight: 17,
    marginTop: 4
  }
});
