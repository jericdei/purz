import { View } from "react-native";
import { FORM_PARTS, FormPartProps } from ".";
import TextInput from "../controlled/text-input";
import DateInput from "../controlled/date-input";
import DropdownInput from "../controlled/dropdown-input";
import { GENDER_OPTIONS } from "~/lib/constants";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { cn } from "~/lib/utils";

export default function PersonalForm({
  form,
  setPart,
  className,
}: FormPartProps) {
  return (
    <View className={cn("flex flex-col gap-4 mt-16 w-full", className)}>
      <TextInput
        control={form.control}
        name="contact_number"
        label="Contact Number"
        placeholder="ex. 09123456789"
        required
        error={form.formState.errors.contact_number?.message}
      />

      <DateInput
        control={form.control}
        label="Date of Birth"
        name="birthday"
        required
        error={form.formState.errors.birthday?.message}
      />

      <DropdownInput
        control={form.control}
        label="Gender"
        name="gender"
        placeholder="Select a gender"
        options={GENDER_OPTIONS}
        required
        error={form.formState.errors.gender?.message}
      />

      <View className="flex flex-col gap-4">
        <Button
          variant="secondary"
          className="mt-8"
          onPress={() => setPart(FORM_PARTS.NAMES)}
        >
          <Text>Previous</Text>
        </Button>

        <Button onPress={() => setPart(FORM_PARTS.ADDRESS)}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
}
