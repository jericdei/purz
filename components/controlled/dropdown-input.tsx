import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import FormLabel from "../form-label";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Text } from "../ui/text";
import { ScrollView } from "react-native";

interface DropdownInputProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  options?: { label: string; value: string }[];
  name: Path<T>;
  required?: boolean;
  placeholder: string;
  error?: string;
}

export default function DropdownInput<T extends FieldValues>({
  control,
  label,
  name,
  required,
  placeholder,
  options = [],
  error,
}: DropdownInputProps<T>) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select
          className="flex flex-col gap-4 w-full"
          onValueChange={(val) => {
            onChange(val?.value);
          }}
          value={options.find((o) => o.value === value)}
        >
          <FormLabel text={label} required={required} />

          <SelectTrigger className={cn("w-full", error && "border-red-500")}>
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder={placeholder}
            />

            {error && <Text className="text-red-500 text-sm">{error}</Text>}
          </SelectTrigger>

          <SelectContent insets={contentInsets} className="w-5/6">
            <ScrollView className="max-h-80">
              <SelectGroup onStartShouldSetResponder={() => true}>
                {options.map(({ label, value }) => (
                  <SelectItem key={value} label={label} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </ScrollView>
          </SelectContent>
        </Select>
      )}
    />
  );
}
