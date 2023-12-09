import { useParams } from "react-router";

export const MedicationPlan = () => {
  const { patientId } = useParams();

  return <>Plan: {patientId}</>;
};
