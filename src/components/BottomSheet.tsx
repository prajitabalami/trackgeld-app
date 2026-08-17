import { ReactNode } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { theme } from "../theme/theme";

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

/**
 * Shared overlay + slide-up sheet used by Add Goal, Add Transaction and
 * Transaction Detail. Wraps RN's built-in <Modal> so it works the same on
 * iOS/Android/web without any extra navigation library.
 */
export function BottomSheet({ visible, onClose, title, children }: BottomSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <Pressable onPress={onClose} style={styles.scrim} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: "rgba(15,20,17,0.42)"
  },
  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
    maxHeight: "88%"
  },
  handle: {
    width: 34,
    height: 4,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
    alignSelf: "center"
  },
  title: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center"
  }
});
