import { Pressable, StyleSheet, Text, View } from "react-native";

import { categoryMeta } from "../data/categories";
import { CategoryKey, theme } from "../theme/theme";

type CategoryPickerProps = {
  categories: CategoryKey[];
  selected: CategoryKey;
  onSelect: (category: CategoryKey) => void;
};

export function CategoryPicker({
  categories,
  selected,
  onSelect
}: CategoryPickerProps) {
  return (
    <View style={styles.grid}>
      {categories.map((key) => {
        const meta = categoryMeta[key];
        const colors = theme.category[key];
        const Icon = meta.icon;
        const isSelected = key === selected;
        return (
          <Pressable
            accessibilityRole="button"
            key={key}
            onPress={() => onSelect(key)}
            style={styles.item}
          >
            <View
              style={[
                styles.circle,
                { backgroundColor: colors.bg },
                isSelected && styles.circleSelected
              ]}
            >
              <Icon color={colors.fg} size={16} strokeWidth={2.2} />
            </View>
            <Text style={styles.label}>{meta.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm
  },
  item: {
    width: 62,
    alignItems: "center",
    gap: 4
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent"
  },
  circleSelected: {
    borderColor: theme.colors.primary
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontFamily: theme.fontFamily.bold,
    textAlign: "center"
  }
});
