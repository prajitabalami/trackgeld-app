import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type SegmentedProps<T extends string> = {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange
}: SegmentedProps<T>) {
  return (
    <View style={styles.track}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            accessibilityRole="button"
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && styles.active]}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    padding: 3,
    gap: 3
  },
  segment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 9,
    borderRadius: theme.radius.sm
  },
  active: {
    backgroundColor: theme.colors.surface,
    ...theme.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 }
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.text
  }
});
