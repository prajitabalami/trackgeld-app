import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { theme } from "../../theme/theme";

type StepWelcomeProps = {
  name: string;
  onNext: () => void;
};

export function StepWelcome({ name, onNext }: StepWelcomeProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.copy}>
        <Text style={styles.title}>Welcome to Claros, {name}!</Text>
        <Text style={styles.body}>
          We need 3 minutes to understand your money situation. You'll never
          wonder where your money went again.
        </Text>
      </View>
      <AppButton onPress={onNext} title="Let's go →" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: theme.spacing.xl
  },
  copy: {
    gap: theme.spacing.sm
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading,
    fontWeight: "800",
    lineHeight: 30
  },
  body: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    lineHeight: 24
  }
});
