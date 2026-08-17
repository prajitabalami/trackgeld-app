import { StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type BrandMarkProps = {
  size?: "sm" | "lg";
};

export function BrandMark({ size = "sm" }: BrandMarkProps) {
  const large = size === "lg";
  return (
    <View style={styles.wrap}>
      <View style={[styles.seal, large && styles.sealLg]}>
        <Text style={[styles.sealText, large && styles.sealTextLg]}>C</Text>
      </View>
      {large ? null : (
        <View>
          <Text style={styles.name}>Claros</Text>
          <Text style={styles.tagline}>Your money, finally visible.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  seal: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary
  },
  sealLg: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.lg
  },
  sealText: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: 14
  },
  sealTextLg: {
    fontSize: 24
  },
  name: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 18
  },
  tagline: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    marginTop: 1
  }
});
