import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View
} from "react-native";

import { theme } from "../theme/theme";

type ScreenProps = {
  children: ReactNode;
  centered?: boolean;
};

export function Screen({ children, centered = false }: ScreenProps) {
  const { width } = useWindowDimensions();
  const horizontalPadding = width < 380 ? theme.spacing.md : theme.spacing.lg;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboard}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          centered && styles.centered,
          { paddingHorizontal: horizontalPadding }
        ]}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    paddingVertical: theme.spacing.xl
  },
  centered: {
    justifyContent: "center"
  },
  inner: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center"
  }
});

