import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import PinInput from "~/components/pin-input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { useAuthStore } from "~/stores/auth.store";
import { useUserStore } from "~/stores/user.store";

const createPinSchema = z
  .object({
    pin: z.string().min(6).max(6),
    confirmPin: z.string().min(6).max(6),
  })
  .superRefine(({ pin, confirmPin }, ctx) => {
    if (pin !== confirmPin) {
      ctx.addIssue({
        code: "custom",
        message: "Pin does not match",
        path: ["confirmPin"],
      });
    }
  });

type CreatePinSchema = z.infer<typeof createPinSchema>;

export default function PinCreate() {
  const [isConfirm, setIsConfirm] = useState(false);

  const { user } = useAuthStore((state) => state);
  const { updatePassCode } = useUserStore((state) => state);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreatePinSchema>({
    resolver: zodResolver(createPinSchema),
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
  });

  const onSubmit = async (values: CreatePinSchema) => {
    if (!user) {
      return router.replace("/auth/generate");
    }

    try {
      await updatePassCode(user.id, values.pin);

      router.replace("/dashboard");
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error instanceof AxiosError) {
        message = error.response?.data.message;
      }

      setError("pin", { message });
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-32">
      <Text className="text-3xl font-bold">
        {isConfirm ? "Confirm PIN" : "Create a new PIN"}
      </Text>

      {Object.values(errors).map((error) => (
        <Text className="text-red-500 text-center my-4" key={error.message}>
          {error.message}
        </Text>
      ))}

      <View className="flex flex-col gap-4 mt-16 w-full">
        <View className={cn("gap-8", isConfirm ? "hidden" : "block")}>
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

          <View className="flex gap-4">
            <Button
              onPress={() => {
                if (getValues().pin.length !== 6) {
                  return setError("pin", {
                    message: "Pin must be 6 digits",
                  });
                }
                setIsConfirm(true);
              }}
            >
              <Text>Continue</Text>
            </Button>

            <Button variant="secondary" onPress={reset as any}>
              <Text>Reset</Text>
            </Button>
          </View>
        </View>

        <View className={cn("gap-8", isConfirm ? `block` : `hidden`)}>
          <Controller
            name="confirmPin"
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

          <View className="flex gap-4">
            <Button onPress={handleSubmit(onSubmit)}>
              <Text>Confirm</Text>
            </Button>

            <Button
              variant="secondary"
              onPress={() => {
                clearErrors("pin");
                setValue("confirmPin", "");
                setIsConfirm(false);
              }}
            >
              <Text>Back</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
