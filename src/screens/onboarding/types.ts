export type IncomeType = "regular" | "freelance" | "mixed";
export type BudgetStyle = "50-30-20" | "custom";

export type OnboardingData = {
  name: string;
  currency: string;
  monthlyIncome: string;
  incomeType: IncomeType;
  budgetStyle: BudgetStyle;
  goalName: string;
  goalTarget: string;
  goalDeadline: string;
  goalMonthly: string;
};

export const initialOnboardingData = (name: string): OnboardingData => ({
  name,
  currency: "EUR",
  monthlyIncome: "",
  incomeType: "regular",
  budgetStyle: "50-30-20",
  goalName: "",
  goalTarget: "",
  goalDeadline: "",
  goalMonthly: ""
});
