import { Redirect } from "expo-router";
import { Text, SafeAreaView } from "react-native";

export default function Home() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-red-600">Home</Text>
    </SafeAreaView>
  );
}
