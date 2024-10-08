import { useQuery } from "@tanstack/react-query";
import axios from "./axios";

type LabelValue = {
  label: string;
  value: string;
};

type GetRegionsResult = {
  region_code: string;
  name: string;
};

export const useGetRegionsQuery = () =>
  useQuery<LabelValue[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/psgc/regions");

        return data.regions.map(({ region_code, name }: GetRegionsResult) => ({
          label: name,
          value: region_code,
        }));
      } catch (error) {
        console.error(error);
      }
    },
  });

export const useGetProvincesQuery = () => {};
