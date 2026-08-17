import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";

import { StepDots } from "../../components/StepDots";
import { theme } from "../../theme/theme";
import { StepBudgetStyle } from "./StepBudgetStyle";
import { StepGoal } from "./StepGoal";
import { StepIncome } from "./StepIncome";
import { StepSummary } from "./StepSummary";
import { StepWelcome } from "./StepWelcome";
import { initialOnboardingData, OnboardingData } from "./types";

type OnboardingScreenProps = {
  name: string;
  onComplete: (data: OnboardingData) => void;
};

const STEP_COUNT = 5;

/**
 * Owns the wizard's step index and the data collected across steps. In the
 * real app, persist `data` (and `step`) after every `setStep` call — e.g.
 * to SecureStore or via a PATCH — so a user who closes the app mid-flow
 * resumes here instead of landing back on Home. See spec §4, "IMPORTANT".
 */
export function OnboardingScreen({ name, onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(() =>
    initialOnboardingData(name)
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrap}
    >
      <View style={styles.inner}>
        <StepDots activeIndex={step} total={STEP_COUNT} />

        {step === 0 && (
          <StepWelcome name={data.name} onNext={() => setStep(1)} />
        )}

        {step === 1 && (
          <StepIncome
            currency={data.currency}
            incomeType={data.incomeType}
            monthlyIncome={data.monthlyIncome}
            onNext={(values) => {
              setData((prev) => ({ ...prev, ...values }));
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <StepBudgetStyle
            budgetStyle={data.budgetStyle}
            onNext={(budgetStyle) => {
              setData((prev) => ({ ...prev, budgetStyle }));
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <StepGoal
            initial={data}
            onNext={(values) => {
              setData((prev) => ({ ...prev, ...values }));
              setStep(4);
            }}
            onSkip={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <StepSummary data={data} onLaunch={() => onComplete(data)} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  inner: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg
  }
});
