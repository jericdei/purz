import { createRef, useEffect, useState } from "react";
import { TextInput, View } from "react-native";

interface PinInputProps {
  length: number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  value: string;
  isHidden?: boolean;
}

export default function PinInput({
  length,
  onChange,
  onBlur,
  value,
  isHidden,
}: PinInputProps) {
  const [arrayValue, setArrayValue] = useState<string[]>([]);

  const refs = Array.from({ length }, () => createRef<TextInput>());

  useEffect(() => {
    onChange(arrayValue.join(""));
  }, [arrayValue]);

  useEffect(() => {
    setArrayValue(value.split(""));
  }, [value]);

  return (
    <View className="flex flex-row justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <TextInput
          ref={refs[index]}
          key={index}
          className="border border-black aspect-square w-12 text-center rounded-md"
          maxLength={1}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          inputMode="numeric"
          secureTextEntry={isHidden}
          autoFocus={index === 0}
          onChangeText={(val) => {
            const nextValue = [...arrayValue];
            nextValue[index] = val;
            setArrayValue(nextValue);
          }}
          onKeyPress={(e) => {
            const nextValue = [...arrayValue];
            const key = e.nativeEvent.key;

            if (key === "Backspace") {
              nextValue[index] = "";
              refs[index - 1]?.current?.focus();
            } else {
              nextValue[index] = key;
              refs[index + 1]?.current?.focus();
            }

            setArrayValue(nextValue);
          }}
          onBlur={onBlur}
          value={value[index]}
        />
      ))}
    </View>
  );
}
