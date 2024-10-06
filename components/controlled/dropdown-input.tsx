import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import FormLabel from "../form-label";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DropdownInputProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  options: { label: string; value: string }[];
  name: Path<T>;
  required?: boolean;
  placeholder: string;
}

export default function DropdownInput<T extends FieldValues>({
  control,
  label,
  name,
  required,
  placeholder,
  options,
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

          <SelectTrigger className="w-full">
            <SelectValue
              className="text-foreground text-sm native:text-lg"
              placeholder={placeholder}
            />
          </SelectTrigger>

          <SelectContent insets={contentInsets} className="w-5/6">
            {options.map(({ label, value }) => (
              <SelectItem key={value} label={label} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
