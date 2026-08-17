import { StyleSheet, View } from "react-native";

import { theme } from "../theme/theme";

type StepDotsProps = {
  total: number;
  /** 0-indexed */
  activeIndex: number;
};

export function StepDots({ total, activeIndex }: StepDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex && styles.active,
            index < activeIndex && styles.done
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 6
  },
  dot: {
    width: 18,
    height: 5,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted
  },
  active: {
    backgroundColor: theme.colors.primary
  },
  done: {
    backgroundColor: theme.colors.primary,
    opacity: 0.45
  }
});
