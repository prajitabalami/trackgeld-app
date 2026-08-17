import { Globe } from "lucide-react-native";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppTextInput } from "../components/AppTextInput";
import { Divider } from "../components/Divider";
import { Screen } from "../components/Screen";
import { theme } from "../theme/theme";

type LoginScreenProps = {
  onLogin: () => void;
  onGoogleLogin: () => void;
  onGoToRegister: () => void;
};

export function LoginScreen({
  onLogin,
  onGoogleLogin,
  onGoToRegister
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canContinue = useMemo(
    () => email.trim().length > 3 && password.trim().length >= 4,
    [email, password]
  );

  return (
    <Screen centered>
      <View style={styles.stack}>
        <View style={styles.hero}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.copy}>Log in to keep your budget on track.</Text>
        </View>

        <View style={styles.form}>
          <AppButton
            icon={<Globe color={theme.colors.google} size={16} />}
            onPress={onGoogleLogin}
            title="Continue with Google"
            variant="secondary"
          />

          <Divider label="or continue with email" />

          <AppTextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="you@example.com"
            value={email}
          />
          <AppTextInput
            autoCapitalize="none"
            label="Password"
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            value={password}
          />

          {/* Phase 2 per spec §3.4 — visible but disabled with a "coming
              soon" tag rather than hidden, so the affordance isn't a
              surprise once password reset ships. */}
          <View style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot password?</Text>
            <View style={styles.comingSoon}>
              <Text style={styles.comingSoonText}>Coming soon</Text>
            </View>
          </View>

          <AppButton disabled={!canContinue} onPress={onLogin} title="Log in" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Text onPress={onGoToRegister} style={styles.footerLink}>
            Sign up
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.lg,
    marginTop: 20
  },
  hero: {
    gap: 4
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.heading - 2,
    fontFamily: theme.fontFamily.bold
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small + 1,
    fontFamily: theme.fontFamily.regular
  },
  form: {
    gap: theme.spacing.md
  },
  forgotRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: -theme.spacing.xs
  },
  forgotText: {
    color: theme.colors.textFaint,
    fontSize: theme.typography.label,
    fontFamily: theme.fontFamily.medium
  },
  comingSoon: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  comingSoonText: {
    color: theme.colors.textMuted,
    fontSize: 9,
    fontFamily: theme.fontFamily.semiBold
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small,
    fontFamily: theme.fontFamily.regular
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.small,
    fontWeight: "800",
    fontFamily: theme.fontFamily.regular
  }
});
