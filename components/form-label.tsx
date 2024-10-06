import { View } from "react-native";
import { Text } from "./ui/text";

interface FormLabelProps {
  text: string;
  required?: boolean;
}

export default function FormLabel({ text, required }: FormLabelProps) {
  return (
    <View className="flex flex-row gap-1">
      <Text className="text-lg font-semibold">{text}</Text>
      {required && <Text className="text-red-500 text-2xl">*</Text>}
    </View>
  );
}
