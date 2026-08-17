import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { AppButton } from "../components/AppButton";
import { BrandMark } from "../components/BrandMark";
import { Screen } from "../components/Screen";
import { theme } from "../theme/theme";

type WelcomeScreenProps = {
  onCreateAccount: () => void;
  onLogin: () => void;
};

export function WelcomeScreen({ onCreateAccount, onLogin }: WelcomeScreenProps) {
  return (
    <Screen centered>
      <View style={styles.stack}>
        <View style={styles.ringWrap} pointerEvents="none">
          <Svg width={280} height={280} viewBox="0 0 280 280">
            <Circle
              cx={140}
              cy={140}
              r={118}
              stroke={theme.colors.surfaceMuted}
              strokeWidth={16}
              fill="none"
            />
            <Circle
              cx={140}
              cy={140}
              r={118}
              stroke={theme.colors.primary}
              strokeWidth={16}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 118}
              strokeDashoffset={2 * Math.PI * 118 * 0.44}
              fill="none"
              origin="140, 140"
              rotation={-90}
              opacity={0.35}
            />
          </Svg>
        </View>

        <BrandMark />

        <View style={styles.hero}>
          <Text style={styles.title}>Your money,{"\n"}finally visible.</Text>
          <Text style={styles.copy}>
            See where every euro goes, and get warned before small spends
            become a pattern.
          </Text>
        </View>

        <View style={styles.actions}>
          <AppButton onPress={onCreateAccount} title="Create account" />
          <AppButton
            onPress={onLogin}
            title="I already have an account"
            variant="ghost"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.lg
  },
  ringWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
  },
  hero: {
    gap: theme.spacing.sm
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title - 4,
    fontWeight: "800",
    lineHeight: 38
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 24
  },
  actions: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm
  }
});
