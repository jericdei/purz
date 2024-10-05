export interface Address {
  // columns
  id: string;
  region_code: string;
  province_code: string;
  municipality_code: string | null;
  sub_municipality_code: string | null;
  city_code: string | null;
  barangay_code: string;
  zip_code: string;
  line_1: string;
  line_2: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Profile {
  // columns
  id: string;
  user_id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  suffix: string | null;
  birthday: string;
  avatar_url: string | null;
  gender: string;
  contact_number: string;
  address_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  // relations
  user: User;
}

export interface Transaction {
  // columns
  id: string;
  type: TransactionType;
  name: unknown;
  user_id: string | null;
  from_user_id: string | null;
  amount: number;
  created_at: string | null;
  updated_at: string | null;
  // relations
  user: User;
  from: User;
}

export interface User {
  // columns
  id: string;
  username: string;
  rank: UserRank;
  balance: number;
  email: string;
  email_verified_at: string | null;
  passcode?: string;
  remember_token?: string | null;
  created_at: string | null;
  updated_at: string | null;
  // relations
  profile: Profile;
  transactions: Transaction[];
}

const TransactionType = {
  DEBIT: "debit",
  CREDIT: "credit",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

const UserRank = {
  BRONZE: "bronze",
  SILVER: "silver",
  GOLD: "gold",
  PLATINUM: "platinum",
  DIAMOND: "diamond",
} as const;

export type UserRank = (typeof UserRank)[keyof typeof UserRank];
