import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-16">
      <Text className="font-bold text-2xl">Login to your account</Text>

      <View className="flex flex-col gap-4 mt-16 w-full">
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              autoCapitalize="none"
              textContentType="emailAddress"
              keyboardType="email-address"
              spellCheck={false}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              textContentType="password"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Sign in</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
