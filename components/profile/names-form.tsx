import { View } from "react-native";
import { FORM_PARTS, FormPartProps } from ".";
import TextInput from "../controlled/text-input";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";

export default function NamesForm({ form, setPart, className }: FormPartProps) {
  return (
    <View className={cn("flex flex-col gap-4 mt-16 w-full", className)}>
      <TextInput
        control={form.control}
        label="Username"
        name="username"
        placeholder="Enter a unique username"
        required
        autoCapitalize="none"
        error={form.formState.errors.username?.message}
      />

      <TextInput
        control={form.control}
        name="first_name"
        label="First Name"
        placeholder="ex. Juan"
        required
        error={form.formState.errors.first_name?.message}
      />

      <TextInput
        control={form.control}
        name="middle_name"
        label="Middle Name"
        placeholder="ex. Santos"
        error={form.formState.errors.middle_name?.message}
      />

      <TextInput
        control={form.control}
        name="last_name"
        label="Last Name"
        placeholder="ex. Dela Cruz"
        required
        error={form.formState.errors.last_name?.message}
      />

      <TextInput
        control={form.control}
        name="suffix"
        label="Name Extension"
        placeholder="ex. Jr., Sr., III"
        error={form.formState.errors.suffix?.message}
      />

      <Button className="mt-8" onPress={() => setPart(FORM_PARTS.PERSONAL)}>
        <Text>Next</Text>
      </Button>
    </View>
  );
}
