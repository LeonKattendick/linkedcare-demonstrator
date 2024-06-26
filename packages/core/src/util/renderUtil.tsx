import { Flex, Tag } from "antd";
import dayjs from "dayjs";
import { TFunction } from "i18next";
import dosageData from "../data/dosage.json";
import { Medication } from "../interface/linca/Medication";
import { Address } from "../interface/linca/fhir/Address";
import { Dosage } from "../interface/linca/fhir/Dosage";

export const renderBirthDate = (b: string | undefined) => {
  return dayjs(b).format("DD.MM.YYYY");
};

export const renderAddress = (a: Address | undefined) => {
  if (!a) return "";
  return `${a.line.join(" ")}, ${a.postalCode} ${a.city}, ${a.country}`;
};

export const renderMedicationRequest = (r: { medication: Medication; dosageInstruction: Dosage[] }, t: TFunction) => {
  return `${r.medication.concept.coding[0].display} [${renderDosage(r.dosageInstruction, t)}]`;
};

export const renderMedicationRequestLabel = (
  r: { medication: Medication; dosageInstruction: Dosage[] },
  t: TFunction
) => {
  return (
    <Flex justify="space-between" align="center">
      {r.medication.concept.coding[0].display} <Tag>{renderDosage(r.dosageInstruction, t)}</Tag>
    </Flex>
  );
};

export const renderDosage = (dosages: Dosage[], t: TFunction) => {
  if (dosages.length !== 1) return t("translation:general.multipleDosages", { amount: dosages.length });

  const d = dosages[0];
  const timingString = t("translation:general.frequencyAndPeriodRender", {
    frequency: d.timing?.repeat.frequency,
    period: d.timing?.repeat.period,
    periodUnit: t(`translation:general.time.${d.timing?.repeat.periodUnit}`),
  });
  const doseString = t("translation:general.doseRender", {
    dose: d.doseAndRate?.[0].doseQuantity.value,
    doseType: dosageData.find((v) => v.code === d.doseAndRate?.[0].doseQuantity.code)?.display,
    doseRate: t(`translation:general.doseRateTypes.${d.doseAndRate?.[0].type.coding[0].code}`),
  });

  return `${timingString}, ${doseString}`;
};
