import { SafeAreaView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

export default function Login() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-16">
      <Text className="font-bold text-2xl">Login to your account</Text>

      <View className="flex flex-col gap-4 mt-16 w-full">
        <Input placeholder="Email" />
        <Input
          secureTextEntry
          textContentType="password"
          placeholder="Password"
        />

        <Button>
          <Text>Sign in</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
