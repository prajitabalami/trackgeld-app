import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";


import { TabKey } from "./src/components/PillTabBar";
import { mockGoals, Goal } from "./src/data/goals";
import {
  mockTransactionGroups,
  Transaction,
  TransactionGroup,
  TransactionType
} from "./src/data/transactions";
import { CategoryKey } from "./src/theme/theme";
import { AddGoalSheet } from "./src/screens/AddGoalSheet";
import { AddTransactionSheet } from "./src/screens/AddTransactionSheet";
import { ActivityScreen } from "./src/screens/ActivityScreen";
import { GoalsScreen } from "./src/screens/GoalsScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { InsightsScreen } from "./src/screens/InsightsScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { OnboardingScreen } from "./src/screens/onboarding/OnboardingScreen";
import { OnboardingData } from "./src/screens/onboarding/types";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { SplashScreen } from "./src/screens/SplashScreen";
import { TransactionDetailSheet } from "./src/screens/TransactionDetailSheet";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { theme } from "./src/theme/theme";


// Simple state-machine "router" — no navigation library involved, matching
// the pattern the original App.tsx already used. Swap this for
// React Navigation's native/bottom-tab stacks (see spec §18.1) once real
// screen transitions, deep links, or back-gesture behaviour are needed;
// the screens themselves don't need to change to make that move.
type Route =
  | "splash"
  | "welcome"
  | "login"
  | "register"
  | "onboarding"
  | "app";

export default function App() {
   const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const [route, setRoute] = useState<Route>("splash");
  const [name, setName] = useState("Alex");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  // Goals/transactions live here (not inside GoalsScreen/ActivityScreen) so
  // the Add sheets — rendered as siblings below — can update the same
  // lists the screens read from. Swap useState for your data-fetching hook
  // of choice (React Query, SWR, etc.) when wiring up the real API.
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [transactionGroups, setTransactionGroups] = useState<
    TransactionGroup[]
  >(mockTransactionGroups);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Splash swaps to Welcome after a beat — in the real app this instead
  // awaits the SecureStore/refresh-token check from spec §3.1 and routes
  // straight to "app" on success, or to "welcome" on failure.
  useEffect(() => {
    if (route !== "splash") return;
    const timer = setTimeout(() => setRoute("welcome"), 1200);
    return () => clearTimeout(timer);
  }, [route]);

  const remainingForGoals =
    (Number(onboardingData?.monthlyIncome) || 2100) -
    goals
      .filter((goal) => goal.status !== "completed")
      .reduce((sum, goal) => sum + goal.monthlyAllocation, 0);

  function handleSaveGoal(newGoal: {
    name: string;
    targetAmount: number;
    monthlyAllocation: number;
  }) {
    setGoals((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: newGoal.name,
        deadlineLabel: "Due —",
        currentAmount: 0,
        targetAmount: newGoal.targetAmount,
        monthlyAllocation: newGoal.monthlyAllocation,
        status: "onTrack"
      }
    ]);
    setShowAddGoal(false);
  }

  function handleSaveTransaction(newTransaction: {
    name: string;
    amount: number;
    type: TransactionType;
    category: CategoryKey;
  }) {
    const signedAmount =
      newTransaction.type === "income"
        ? Math.abs(newTransaction.amount)
        : -Math.abs(newTransaction.amount);

    const transaction: Transaction = {
      id: String(Date.now()),
      name: newTransaction.name,
      category: newTransaction.category,
      amount: signedAmount,
      type: newTransaction.type,
      timeLabel: "Just now",
      dateLabel: "Today"
    };

    setTransactionGroups((prev) => {
      const [first, ...rest] = prev;
      if (first?.label === "Today") {
        return [{ ...first, items: [transaction, ...first.items] }, ...rest];
      }
      return [{ label: "Today", items: [transaction] }, ...prev];
    });
    setShowAddTransaction(false);
  }

  function handleDeleteTransaction(target: Transaction) {
    setTransactionGroups((prev) =>
      prev
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.id !== target.id)
        }))
        .filter((group) => group.items.length > 0)
    );
    setSelectedTransaction(null);
  }

  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />

      {route === "splash" && <SplashScreen />}

      {route === "welcome" && (
        <WelcomeScreen
          onCreateAccount={() => setRoute("register")}
          onLogin={() => setRoute("login")}
        />
      )}

      {route === "login" && (
        <LoginScreen
          onGoToRegister={() => setRoute("register")}
          onGoogleLogin={() => setRoute("app")}
          onLogin={() => setRoute("app")}
        />
      )}

      {route === "register" && (
        <RegisterScreen
          onGoToLogin={() => setRoute("login")}
          onGoogleRegister={() => setRoute("onboarding")}
          onRegister={() => setRoute("onboarding")}
        />
      )}

      {route === "onboarding" && (
        <OnboardingScreen
          name={name}
          onComplete={(data) => {
            setOnboardingData(data);
            setRoute("app");
          }}
        />
      )}

      {route === "app" && activeTab === "home" && (
        <HomeScreen
          activeTab={activeTab}
          monthlyIncome={Number(onboardingData?.monthlyIncome) || 2100}
          name={name}
          onChangeTab={setActiveTab}
        />
      )}

      {route === "app" && activeTab === "insights" && (
        <InsightsScreen activeTab={activeTab} onChangeTab={setActiveTab} />
      )}

      {route === "app" && activeTab === "goals" && (
        <GoalsScreen
          activeTab={activeTab}
          goals={goals}
          onAddGoal={() => setShowAddGoal(true)}
          onChangeTab={setActiveTab}
        />
      )}

      {route === "app" && activeTab === "activity" && (
        <ActivityScreen
          activeTab={activeTab}
          groups={transactionGroups}
          onAddTransaction={() => setShowAddTransaction(true)}
          onChangeTab={setActiveTab}
          onSelectTransaction={setSelectedTransaction}
        />
      )}

      <AddGoalSheet
        onClose={() => setShowAddGoal(false)}
        onSave={handleSaveGoal}
        remainingBeforeThisGoal={remainingForGoals}
        visible={showAddGoal}
      />

      <AddTransactionSheet
        onClose={() => setShowAddTransaction(false)}
        onSave={handleSaveTransaction}
        visible={showAddTransaction}
      />

      <TransactionDetailSheet
        onClose={() => setSelectedTransaction(null)}
        onDelete={handleDeleteTransaction}
        onEdit={() => {
          // Real implementation: close this sheet and reopen
          // AddTransactionSheet pre-filled with `transaction`'s values.
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.lg
  }
});
