import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { theme } from "../theme/theme";

type RingProgressProps = {
  /** 0–1 */
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  centerLabel: string;
  centerSubLabel?: string;
};

export function RingProgress({
  progress,
  size = 128,
  strokeWidth = 12,
  color = theme.colors.primary,
  trackColor = theme.colors.surfaceMuted,
  centerLabel,
  centerSubLabel
}: RingProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const dashOffset = circumference * (1 - clamped);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          // Rotate so the fill starts at 12 o'clock instead of 3 o'clock.
          origin={`${size / 2}, ${size / 2}`}
          rotation={-90}
        />
      </Svg>
      <View style={[styles.center, { width: size, height: size }]}>
        <Text style={styles.label} numberOfLines={1} adjustsFontSizeToFit>
          {centerLabel}
        </Text>
        {centerSubLabel ? (
          <Text style={styles.subLabel}>{centerSubLabel}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    color: theme.colors.text,
    fontSize: 21,
    fontWeight: "800"
  },
  subLabel: {
    color: theme.colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2
  }
});
