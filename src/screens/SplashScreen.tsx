import { StyleSheet, Text, View } from "react-native";

import { BrandMark } from "../components/BrandMark";
import { theme } from "../theme/theme";

/**
 * Shown for 1–2s while App checks SecureStore for a refresh token. Per
 * spec §3.1: white background only, no spinner — the logo is the only
 * thing on screen, and the transition to Welcome/Home is instant.
 */
export function SplashScreen() {
  return (
    <View style={styles.wrap}>
      <BrandMark size="lg" />
      <Text style={styles.name}>Claros</Text>
      <Text style={styles.tagline}>Your money, finally visible.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm
  },
  name: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: theme.spacing.sm
  },
  tagline: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small
  }
});
