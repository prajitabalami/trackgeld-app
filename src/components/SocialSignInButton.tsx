import { Apple, CircleUser, Globe } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "../theme/theme";

type SocialProvider = "apple" | "google" | "facebook";
type SocialIcon = typeof Globe;

type SocialSignInButtonProps = {
  provider: SocialProvider;
  onPress: () => void;
};

const providerConfig: Record<
  SocialProvider,
  { label: string; Icon: SocialIcon; color: string }
> = {
  google: {
    label: "Continue with Google",
    Icon: Globe,
    color: "#4285F4"
  },
  apple: {
    label: "Continue with Apple",
    Icon: Apple,
    color: theme.colors.text
  },
  facebook: {
    label: "Continue with Facebook",
    Icon: CircleUser,
    color: theme.colors.facebook
  }
};

export function SocialSignInButton({
  provider,
  onPress
}: SocialSignInButtonProps) {
  const config = providerConfig[provider];
  const Icon = config.Icon;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.mark}>
        <Icon color={config.color} size={19} strokeWidth={2.5} />
      </View>
      <Text style={styles.label}>{config.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    backgroundColor: theme.colors.surfaceMuted
  },
  mark: {
    width: 26,
    height: 26,
    borderRadius: theme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    fontWeight: "700"
  }
});
