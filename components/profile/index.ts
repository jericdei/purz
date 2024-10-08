import { UseFormReturn } from "react-hook-form";
import { UpdateProfileSchema } from "~/lib/schema";

export const FORM_PARTS = {
  NAMES: "names",
  PERSONAL: "personal",
  ADDRESS: "address",
} as const;

export type FormPart = (typeof FORM_PARTS)[keyof typeof FORM_PARTS];

export interface FormPartProps {
  form: UseFormReturn<UpdateProfileSchema>;
  setPart: (part: FormPart) => void;
}
