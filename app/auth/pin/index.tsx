import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import PinInput from "~/components/pin-input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthStore } from "~/stores/auth.store";
import { useUserStore } from "~/stores/user.store";

const enterPinSchema = z.object({
  pin: z.string().max(6),
});

type EnterPinSchema = z.infer<typeof enterPinSchema>;

export default function Pin() {
  const { user } = useAuthStore((state) => state);
  const { verifyPassCode } = useUserStore((state) => state);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnterPinSchema>({
    resolver: zodResolver(enterPinSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async ({ pin }: EnterPinSchema) => {
    if (!user) {
      return router.replace("/auth/generate");
    }

    const verified = await verifyPassCode(user.id, pin);

    if (!verified) {
      setError("pin", { message: "Invalid pin" });

      return;
    }

    router.replace("/dashboard");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="flex flex-col gap-4 items-center">
        <Text className="text-3xl font-bold">Enter your PIN</Text>

        {Object.values(errors).map((error) => (
          <Text className="text-red-500 text-center my-4" key={error.message}>
            {error.message}
          </Text>
        ))}

        <Controller
          name="pin"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <PinInput
              length={6}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              isHidden
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
