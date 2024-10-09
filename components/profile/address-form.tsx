import { View, ScrollView } from "react-native";
import { FORM_PARTS, FormPartProps } from ".";
import TextInput from "../controlled/text-input";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import DropdownInput from "../controlled/dropdown-input";
import {
  useGetBarangaysQuery,
  useGetCitiesAndMunicipalitiesQuery,
  useGetProvincesQuery,
  useGetRegionsQuery,
  useGetSubMunicipalitiesQuery,
} from "~/lib/queries";
import { useState } from "react";

const NCR_CODE = "13";
const MANILA_CODE = "80600";

export default function AddressForm({
  form,
  setPart,
  onSubmit,
}: FormPartProps & { onSubmit: () => void }) {
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  const [provinceCode, setProvinceCode] = useState<string | undefined>(
    undefined
  );
  const [cityCode, setCityCode] = useState<string | undefined>(undefined);
  const [subMunicipalityCode, setSubMunicipalityCode] = useState<
    string | undefined
  >(undefined);

  const { data: regions } = useGetRegionsQuery();
  const { data: provinces, refetch: refetchProvinces } =
    useGetProvincesQuery(regionCode);
  const { data: cities, refetch: refetchCities } =
    useGetCitiesAndMunicipalitiesQuery(regionCode, provinceCode);
  const { data: subMunicipalities, refetch: refetchSubMunicipalities } =
    useGetSubMunicipalitiesQuery();
  const { data: barangays, refetch: refetchBarangays } = useGetBarangaysQuery(
    cityCode,
    subMunicipalityCode
  );

  const isNCR = regionCode === NCR_CODE;
  const isManila = cityCode === MANILA_CODE;

  return (
    <View>
      <ScrollView className="max-h-[60vh]">
        <View className="flex flex-col gap-4 mt-16 w-full">
          <DropdownInput
            control={form.control}
            name="region_code"
            label="Region"
            placeholder="Select a region"
            required
            options={regions}
            error={form.formState.errors.region_code?.message}
            onValueChange={(region) => {
              if (region === NCR_CODE) {
                refetchCities();
              }

              form.setValue("province_code", "");
              form.setValue("city_code", "");
              form.setValue("sub_municipality_code", "");
              form.setValue("barangay_code", "");

              setRegionCode(region);
              setProvinceCode(undefined);
              setCityCode(undefined);

              refetchProvinces();
            }}
          />

          {!isNCR && (
            <DropdownInput
              control={form.control}
              name="province_code"
              label="Province"
              placeholder="Select a province"
              required
              options={provinces}
              error={form.formState.errors.province_code?.message}
              disabled={!regionCode || isNCR}
              onValueChange={(province) => {
                form.setValue("city_code", "");
                form.setValue("sub_municipality_code", "");
                form.setValue("barangay_code", "");

                setProvinceCode(province);
                setCityCode(undefined);

                refetchCities();
              }}
            />
          )}

          <DropdownInput
            control={form.control}
            name="city_code"
            label="City/Municipality"
            placeholder="Select a city or municipality"
            required
            options={cities}
            error={form.formState.errors.city_code?.message}
            disabled={isNCR ? !regionCode : !provinceCode}
            onValueChange={(city) => {
              if (city === MANILA_CODE) {
                refetchSubMunicipalities();
              }

              form.setValue("barangay_code", "");

              setCityCode(city);

              refetchBarangays();
            }}
          />

          {isManila && (
            <DropdownInput
              control={form.control}
              name="sub_municipality_code"
              label="Sub-Municipality"
              placeholder="Select a sub-municipality"
              required
              options={subMunicipalities}
              error={form.formState.errors.sub_municipality_code?.message}
              disabled={!cityCode}
              onValueChange={(subMunicipality) => {
                form.setValue("barangay_code", "");

                setSubMunicipalityCode(subMunicipality);

                refetchBarangays();
              }}
            />
          )}

          <DropdownInput
            control={form.control}
            name="barangay_code"
            label="Barangay"
            placeholder="Select a barangay"
            required
            options={barangays}
            error={form.formState.errors.barangay_code?.message}
            disabled={!cityCode}
          />

          <TextInput
            control={form.control}
            name="zip_code"
            label="Zip Code"
            placeholder="ex. 1013"
            required
            error={form.formState.errors.zip_code?.message}
          />

          <TextInput
            control={form.control}
            name="line_1"
            label="Address Line 1"
            placeholder="ex. 123 South St."
            required
            error={form.formState.errors.line_1?.message}
          />

          <TextInput
            control={form.control}
            name="line_2"
            label="Address Line 2"
            placeholder="ex. 123 South St."
            error={form.formState.errors.line_2?.message}
          />
        </View>
      </ScrollView>

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
