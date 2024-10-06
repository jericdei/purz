import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "~/components/ui/text";

export default function Pin() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-32">
      <Text>Enter your pin</Text>
    </SafeAreaView>
  );
}
