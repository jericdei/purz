import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import { Text } from "~/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import PurzLogo from "~/components/vector/purz.logo";
import { Button } from "~/components/ui/button";
import axios from "~/lib/axios";
import { router, useLocalSearchParams } from "expo-router";
import { AxiosError } from "axios";
import PinInput from "~/components/pin-input";

const registerSchema = z.object({
  code: z.string().min(5).max(5),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Validate() {
  const { email } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async ({ code }: RegisterSchema) => {
    try {
      if (!email) {
        throw new Error();
      }

      await axios.post("/auth/code/validate", {
        email,
        code,
      });

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);

        if (error.status === 403) {
          return setError("code", {
            message: error.response?.data.message,
          });
        }
      }

      return setError("code", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-32">
      <PurzLogo />

      <Text className="text-center">Enter the code sent to your email.</Text>

      <View className="flex flex-col gap-4 mt-16 w-full">
        <Controller
          name="code"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PinInput
              length={5}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
        />

        {errors.code && (
          <Text className="text-red-500 text-center">
            {errors.code.message}
          </Text>
        )}

        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Sign in</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
