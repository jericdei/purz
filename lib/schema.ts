import { z } from "zod";
import { GENDER } from "./constants";

export const updateProfileSchema = z.object({
  username: z.string().min(1, { message: "This field is required" }),
  first_name: z.string().min(1, { message: "This field is required" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "This field is required" }),
  suffix: z.string().optional(),
  contact_number: z.string().min(1, { message: "This field is required" }),
  birthday: z.date().nullable(),
  gender: z.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER]).nullable(),
  line_1: z.string().min(1, { message: "This field is required" }),
  line_2: z.string().optional(),
  region_code: z.string(),
  province_code: z.string(),
  municipality_code: z.string().optional(),
  sub_municipality_code: z.string().optional(),
  city_code: z.string().optional(),
  barangay_code: z.string().optional(),
  zip_code: z.string().min(1, { message: "This field is required" }),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
