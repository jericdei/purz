import { View } from "react-native";
import { FORM_PARTS, FormPartProps } from ".";
import TextInput from "../controlled/text-input";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import DropdownInput from "../controlled/dropdown-input";
import { useGetRegionsQuery } from "~/lib/queries";

export default function AddressForm({
  form,
  setPart,
  onSubmit,
}: FormPartProps & { onSubmit: () => void }) {
  const { data: regions } = useGetRegionsQuery();

  return (
    <View className="flex flex-col gap-4 mt-16 w-full">
      <DropdownInput
        control={form.control}
        name="region_code"
        label="Region"
        placeholder="ex. 01"
        required
        options={regions}
        error={form.formState.errors.region_code?.message}
      />

      <TextInput
        control={form.control}
        name="zip_code"
        label="Zip Code"
        placeholder="1013"
        required
        error={form.formState.errors.zip_code?.message}
      />

      <TextInput
        control={form.control}
        name="line_1"
        label="Address Line 1"
        placeholder="268 Mustasa St."
        required
        error={form.formState.errors.line_1?.message}
      />

      <View className="flex flex-col gap-4">
        <Button
          variant="secondary"
          className="mt-8"
          onPress={() => setPart(FORM_PARTS.PERSONAL)}
        >
          <Text>Previous</Text>
        </Button>

        <Button onPress={onSubmit}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
}
