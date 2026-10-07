import { Globe } from "lucide-react-native";
import { useMemo, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { AppTextInput } from "../components/AppTextInput";
import { Divider } from "../components/Divider";
import { Screen } from "../components/Screen";
import { theme } from "../theme/theme";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { loginWithEmail, signupWithEmail, loginWithGoogle } from "../api/auth";

type RegisterScreenProps = {
  onGoogleRegister: () => void;
  onGoToLogin: () => void;
  onRegister: (firstName: string) => void;

};
console.log("GOOGLE WEB CLIENT ID:", process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID);

const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

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
  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
    });
  }, []);

  const canContinue = useMemo(
    () =>
      name.trim().length >= 2 &&
      email.trim().length > 3 &&
      password.length >= 8 &&
      password === confirmPassword,
    [name, email, password, confirmPassword]
  );

  async function handleGoogleRegister() {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) throw new Error("No ID Token returned.");

      const result = await loginWithGoogle(idToken);
      setIsSubmitting(false);

      if (result.ok) {
        onRegister(name.trim() || "User");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      if (error.code !== "SIGN_IN_CANCELLED") {
        setErrorMessage("Google Sign-In failed.");
      }
    }
  }


  async function handleRegister() {
    setIsSubmitting(true);
    setErrorMessage("");
    setEmailTaken(false);

    // 1) Create the account
    const signup = await signupWithEmail({
      email: email.trim(),
      password,
      display_name: name.trim()
    });

    if (!signup.ok) {
      setIsSubmitting(false);
      if (signup.status === 409) {
        setEmailTaken(true);
      } else {
        setErrorMessage(signup.message);
      }
      return;
    }

    // 2) Log in right away so the app gets a token
    const login = await loginWithEmail(email.trim(), password);
    setIsSubmitting(false);

    if (login.ok) {
      onRegister(login.firstName); // -> onboarding, with the first name
    } else {
      setErrorMessage(
        `Account created, but we couldn't log you in yet: ${login.message}`
      );
    }
  }
  return (
    <Screen centered>
      <View style={styles.stack}>
        <View style={styles.hero}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.copy}>Takes about a minute.</Text>
        </View>

        <View style={styles.form}>
          <AppButton
            disabled={isSubmitting}
            icon={<Globe color={theme.colors.google} size={16} />}
            onPress={handleGoogleRegister}
            title={isSubmitting ? "Connecting…" : "Continue with Google"}
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
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <AppButton
            disabled={!canContinue || isSubmitting}
            onPress={handleRegister}
            title={isSubmitting ? "Creating account…" : "Create account"}
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
  fieldGroup: {
    gap: 4
  },
  inputError: {
    borderColor: theme.colors.danger
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.label,
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
    fontFamily: theme.fontFamily.bold
  }
});
