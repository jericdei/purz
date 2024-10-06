import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthStore } from "~/stores/auth.store";

export default function Dashboard() {
  const { logout, user } = useAuthStore((state) => state);

  const handleLogout = async () => {
    await logout();

    return router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>BRUHHH</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>

      <Button className="mt-8" onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </SafeAreaView>
  );
}
