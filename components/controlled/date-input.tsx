import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormLabel from "../form-label";
import { Text } from "../ui/text";

interface DateInputProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
  error?: string;
}

export default function DateInput<T extends FieldValues>({
  control,
  label,
  name,
  required,
  error,
}: DateInputProps<T>) {
  return (
    <SafeAreaView>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View className="flex flex-col gap-4 items-start">
            <FormLabel text={label} required={required} />

            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(value)}
              mode="date"
              display="compact"
              maximumDate={new Date()}
              onChange={(_, selectedDate) => {
                onChange(selectedDate);
              }}
            />

            {error && <Text className="text-red-500 text-sm">{error}</Text>}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
