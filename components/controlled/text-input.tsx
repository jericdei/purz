import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import FormLabel from "../form-label";
import { TextInputProps as BaseTextInputProps } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "../ui/text";

interface TextInputProps<T extends FieldValues> extends BaseTextInputProps {
  control: Control<T>;
  label: string;
  name: Path<T>;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export default function TextInput<T extends FieldValues>({
  control,
  label,
  name,
  required,
  placeholder,
  error,
  ...props
}: TextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <FormLabel text={label} required={required} />
          <Input
            className={cn(error && "border-red-500")}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            {...props}
          />
          {error && <Text className="text-red-500 text-sm">{error}</Text>}
        </>
      )}
    />
  );
}
