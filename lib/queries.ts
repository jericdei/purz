import { useQuery } from "@tanstack/react-query";
import axios from "./axios";

export type LabelValue = {
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

type GetProvincesResult = {
  province_code: string;
  name: string;
};

export const useGetProvincesQuery = (region_code?: string) =>
  useQuery<LabelValue[]>({
    queryKey: ["provinces", region_code],
    queryFn: async () => {
      try {
        if (!region_code) {
          return [];
        }

        const { data } = await axios.get(
          `/psgc/provinces?region_code=${region_code}`
        );

        return data.provinces.map(
          ({ province_code, name }: GetProvincesResult) => ({
            label: name,
            value: province_code,
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

export type CityOrMunicipality = "city" | "municipality";

type GetCitiesAndMunicipalitiesResult = {
  type: CityOrMunicipality;
  code: string;
  name: string;
};

type GetCitiesResult = {
  city_code: string;
  name: string;
};

export const useGetCitiesAndMunicipalitiesQuery = (
  region_code?: string,
  province_code?: string
) =>
  useQuery<(LabelValue & { type: CityOrMunicipality })[]>({
    queryKey: ["cities-and-municipalities", region_code, province_code],
    queryFn: async () => {
      try {
        if (!province_code && !region_code) {
          return [];
        }

        if (province_code) {
          const { data } = await axios.get(
            `/psgc/cities_and_municipalities?province_code=${province_code}`
          );

          return data.cities_and_municipalities.map(
            ({ type, code, name }: GetCitiesAndMunicipalitiesResult) => ({
              type,
              label: name,
              value: code,
            })
          );
        }

        const { data } = await axios.get(
          `/psgc/cities?region_code=${region_code}`
        );

        return data.cities.map(({ city_code, name }: GetCitiesResult) => ({
          label: name,
          value: city_code,
        }));
      } catch (error) {
        console.error(error);
      }
    },
  });

type GetSubMunicipalitiesResult = {
  municipality_code: string;
  name: string;
};

export const useGetSubMunicipalitiesQuery = () =>
  useQuery<LabelValue[]>({
    queryKey: ["sub-municipalities"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/psgc/sub_municipalities");

        return data.sub_municipalities.map(
          ({ municipality_code, name }: GetSubMunicipalitiesResult) => ({
            label: name,
            value: municipality_code,
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

type GetBarangaysResult = {
  barangay_code: string;
  name: string;
};

export const useGetBarangaysQuery = (
  city_municipality_code?: string,
  sub_municipality_code?: string
) =>
  useQuery<LabelValue[]>({
    queryKey: ["barangays", city_municipality_code, sub_municipality_code],
    queryFn: async () => {
      try {
        if (!sub_municipality_code && !city_municipality_code) {
          return [];
        }

        let path = null;

        if (city_municipality_code && city_municipality_code !== "80600") {
          path = `/psgc/barangays?municipality_code=${city_municipality_code}`;
        } else if (sub_municipality_code) {
          path = `/psgc/barangays?municipality_code=${sub_municipality_code}`;
        }

        if (!path) {
          return [];
        }

        const { data } = await axios.get(path);

        return data.barangays.map(
          ({ barangay_code, name }: GetBarangaysResult) => ({
            label: name,
            value: barangay_code,
          })
        );
      } catch (error) {
        console.error(error);

        return [];
      }
    },
  });
