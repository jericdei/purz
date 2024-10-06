import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import DateInput from "~/components/controlled/date-input";
import DropdownInput from "~/components/controlled/dropdown-input";
import TextInput from "~/components/controlled/text-input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { GENDER, GENDER_OPTIONS } from "~/lib/constants";

const updateProfileSchema = z.object({
  username: z.string().min(1),
  first_name: z.string().min(1),
  middle_name: z.string().min(1).optional(),
  last_name: z.string().min(1),
  suffix: z.string().optional(),
  contact_number: z.string().min(1),
  birthday: z.date().nullable(),
  gender: z.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER]).nullable(),
  line_1: z.string().min(1),
  line_2: z.string().optional(),
  region_code: z.string(),
  province_code: z.string(),
  municipality_code: z.string().optional(),
  sub_municipality_code: z.string().optional(),
  city_code: z.string().optional(),
  barangay_code: z.string().optional(),
  zip_code: z.string().min(1),
});

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

const FORM_PARTS = {
  NAMES: "names",
  PERSONAL: "personal",
  ADDRESS: "address",
} as const;

type FormPart = (typeof FORM_PARTS)[keyof typeof FORM_PARTS];

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

      <View className="mt-8 flex flex-col gap-2">
        {/* {form.formState.errors &&
          Object.entries(form.formState.errors).map(([name, error]) => (
            <Text className="text-red-500" key={`${name}-${error.message}`}>
              {name}: {error.message}
            </Text>
          ))} */}
        <Text>{JSON.stringify(form.formState.errors, null, 2)}</Text>
      </View>

      {part === FORM_PARTS.NAMES && (
        <Names control={form.control} setPart={setPart} />
      )}

      {part === FORM_PARTS.PERSONAL && (
        <Personal control={form.control} setPart={setPart} />
      )}

      {part === FORM_PARTS.ADDRESS && (
        <Address
          control={form.control}
          setPart={setPart}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </SafeAreaView>
  );
}

interface FormPartProps {
  control: Control<UpdateProfileSchema>;
  setPart: (part: FormPart) => void;
}

function Names({ control, setPart }: FormPartProps) {
  return (
    <View className="flex flex-col gap-4 mt-16 w-full">
      <TextInput
        control={control}
        label="Username"
        name="username"
        placeholder="Enter a unique username"
        required
        autoCapitalize="none"
      />

      <TextInput
        control={control}
        name="first_name"
        label="First Name"
        placeholder="ex. Juan"
        required
      />

      <TextInput
        control={control}
        name="middle_name"
        label="Middle Name"
        placeholder="ex. Santos"
      />

      <TextInput
        control={control}
        name="last_name"
        label="Last Name"
        placeholder="ex. Dela Cruz"
        required
      />

      <TextInput
        control={control}
        name="suffix"
        label="Name Extension"
        placeholder="ex. Jr., Sr., III"
      />

      <Button className="mt-8" onPress={() => setPart(FORM_PARTS.PERSONAL)}>
        <Text>Next</Text>
      </Button>
    </View>
  );
}

function Personal({ control, setPart }: FormPartProps) {
  return (
    <View className="flex flex-col gap-4 mt-16 w-full">
      <TextInput
        control={control}
        name="contact_number"
        label="Contact Number"
        placeholder="ex. 09123456789"
        required
      />

      <DateInput
        control={control}
        label="Date of Birth"
        name="birthday"
        required
      />

      <DropdownInput
        control={control}
        label="Gender"
        name="gender"
        placeholder="Select a gender"
        options={GENDER_OPTIONS}
        required
      />

      <View className="flex flex-col gap-4">
        <Button
          variant="secondary"
          className="mt-8"
          onPress={() => setPart(FORM_PARTS.NAMES)}
        >
          <Text>Previous</Text>
        </Button>

        <Button onPress={() => setPart(FORM_PARTS.ADDRESS)}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
}

function Address({
  control,
  setPart,
  onSubmit,
}: FormPartProps & { onSubmit: () => void }) {
  return (
    <View className="flex flex-col gap-4 mt-16 w-full">
      <TextInput
        control={control}
        name="region_code"
        label="Region"
        placeholder="ex. 01"
        required
      />

      <TextInput
        control={control}
        name="zip_code"
        label="Zip Code"
        placeholder="1013"
        required
      />

      <TextInput
        control={control}
        name="line_1"
        label="Address Line 1"
        placeholder="268 Mustasa St."
        required
      />

      <View className="flex flex-col gap-4">
        <Button
          variant="secondary"
          className="mt-8"
          onPress={() => setPart(FORM_PARTS.PERSONAL)}
        >
          <Text>Previous</Text>
        </Button>

        <Button onPress={onSubmit}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
}
