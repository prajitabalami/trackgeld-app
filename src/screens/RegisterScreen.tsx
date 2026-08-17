import { Globe } from "lucide-react-native";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppTextInput } from "../components/AppTextInput";
import { Divider } from "../components/Divider";
import { Screen } from "../components/Screen";
import { theme } from "../theme/theme";

type RegisterScreenProps = {
  onRegister: () => void;
  onGoogleRegister: () => void;
  onGoToLogin: () => void;
};

export function RegisterScreen({
  onRegister,
  onGoogleRegister,
  onGoToLogin
}: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Demo-only flag to preview the "email already exists" error state from
  // spec §3.3. Wire this up to the real POST /auth/register response.
  const [emailTaken, setEmailTaken] = useState(false);

  const canContinue = useMemo(
    () =>
      name.trim().length >= 2 &&
      email.trim().length > 3 &&
      password.length >= 8 &&
      password === confirmPassword,
    [name, email, password, confirmPassword]
  );

  return (
    <Screen centered>
      <View style={styles.stack}>
        <View style={styles.hero}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.copy}>Takes about a minute.</Text>
        </View>

        <View style={styles.form}>
          <AppButton
            icon={<Globe color={theme.colors.google} size={16} />}
            onPress={onGoogleRegister}
            title="Continue with Google"
            variant="secondary"
          />

          <Divider label="or sign up with email" />

          <AppTextInput
            autoCapitalize="words"
            label="Full name"
            onChangeText={setName}
            placeholder="Alex Berger"
            value={name}
          />
          <View style={styles.fieldGroup}>
            <AppTextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              label="Email"
              onChangeText={(value) => {
                setEmail(value);
                setEmailTaken(false);
              }}
              placeholder="you@example.com"
              style={emailTaken ? styles.inputError : undefined}
              value={email}
            />
            {emailTaken ? (
              <Text style={styles.errorText}>
                An account with this email already exists.
              </Text>
            ) : null}
          </View>
          <AppTextInput
            autoCapitalize="none"
            label="Password"
            onChangeText={setPassword}
            placeholder="Min. 8 characters"
            secureTextEntry
            value={password}
          />
          <AppTextInput
            autoCapitalize="none"
            label="Confirm password"
            onChangeText={setConfirmPassword}
            placeholder="Re-enter password"
            secureTextEntry
            value={confirmPassword}
          />

          <AppButton
            disabled={!canContinue}
            onPress={onRegister}
            title="Create account"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Text onPress={onGoToLogin} style={styles.footerLink}>
            Log in
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
    fontWeight: "800"
  },
  copy: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small + 1
  },
  form: {
    gap: theme.spacing.md
  },
  fieldGroup: {
    gap: 4
  },
  inputError: {
    borderColor: theme.colors.danger
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.label,
    fontWeight: "700"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.small
  },
  footerLink: {
    color: theme.colors.primary,
    fontSize: theme.typography.small,
    fontWeight: "800"
  }
});
