import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import PurzLogo from "~/components/vector/purz.logo";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <PurzLogo />

      <Button onPress={() => router.push("/auth/generate")}>
        <Text>Get Started</Text>
      </Button>
    </SafeAreaView>
  );
}
