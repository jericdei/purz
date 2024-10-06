import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import { Text } from "~/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import PurzLogo from "~/components/vector/purz.logo";
import { Button } from "~/components/ui/button";
import axios from "~/lib/axios";
import { router } from "expo-router";
import { AxiosError } from "axios";

const registerSchema = z.object({
  email: z.string().email(),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Generate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: RegisterSchema) => {
    try {
      await axios.post("/auth/code/generate", {
        email,
      });

      router.push(`/auth/validate?email=${email}`);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        if (error.status === 422) {
          return setError("email", {
            message: error.response?.data.message,
          });
        }
      }

      return setError("email", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-32">
      <PurzLogo />

      <Text className="text-center">
        Enter your email address to get started.
      </Text>

      <View className="flex flex-col gap-4 mt-16 w-full">
        <Controller
          name="email"
          control={control}
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

        {errors.email && (
          <Text className="text-red-500 text-center">
            {errors.email.message}
          </Text>
        )}

        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
