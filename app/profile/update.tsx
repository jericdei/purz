import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { FORM_PARTS, FormPart } from "~/components/profile";
import AddressForm from "~/components/profile/address-form";
import NamesForm from "~/components/profile/names-form";
import PersonalForm from "~/components/profile/personal-form";
import { Text } from "~/components/ui/text";
import { updateProfileSchema, UpdateProfileSchema } from "~/lib/schema";
import { cn } from "~/lib/utils";

export default function UpdateProfile() {
  const [part, setPart] = useState<FormPart>(FORM_PARTS.NAMES);

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      contact_number: "",
      birthday: null,
      gender: null,
      line_1: "",
      line_2: "",
      region_code: "",
      province_code: "",
      municipality_code: "",
      sub_municipality_code: "",
      city_code: "",
      barangay_code: "",
      zip_code: "",
    },
  });

  const onSubmit = (data: UpdateProfileSchema) => {
    console.log(data);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center mx-16">
      <Text className="text-xl text-center font-bold">
        Please fill up your personal details.
      </Text>

      <NamesForm
        className={cn(part === FORM_PARTS.NAMES ? "block" : "hidden")}
        form={form}
        setPart={setPart}
      />

      <PersonalForm
        className={cn(part === FORM_PARTS.PERSONAL ? "block" : "hidden")}
        form={form}
        setPart={setPart}
      />

      <AddressForm
        className={cn(part === FORM_PARTS.ADDRESS ? "block" : "hidden")}
        form={form}
        setPart={setPart}
        onSubmit={form.handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
}
