import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import PurzLogo from "~/components/vector/purz.logo";
import { useAuthStore } from "~/stores/auth.store";

export default function Home() {
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    (async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");

      if (Boolean(hasLaunched)) {
        return router.replace("/auth/pin");
      }
    })();
  });

  if (user) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <PurzLogo />

      <Button onPress={() => router.push("/auth/generate")}>
        <Text>Get Started</Text>
      </Button>
    </SafeAreaView>
  );
}
