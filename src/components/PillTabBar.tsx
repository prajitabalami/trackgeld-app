import { Home, List, PieChart, Target } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { theme } from "../theme/theme";

export type TabKey = "home" | "insights" | "goals" | "activity";

const TABS: { key: TabKey; Icon: typeof Home }[] = [
  { key: "home", Icon: Home },
  { key: "insights", Icon: PieChart },
  { key: "goals", Icon: Target },
  { key: "activity", Icon: List }
];

type PillTabBarProps = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
};

export function PillTabBar({ active, onChange }: PillTabBarProps) {
  return (
    <View style={styles.bar}>
      {TABS.map(({ key, Icon }) => (
        <Pressable
          accessibilityRole="button"
          hitSlop={10}
          key={key}
          onPress={() => onChange(key)}
        >
          <Icon
            color={active === key ? theme.colors.primary : theme.colors.textMuted}
            size={19}
            strokeWidth={2.2}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 14,
    height: 56,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#14201A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6
  }
});
