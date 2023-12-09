import { useParams } from "react-router";

export const Order = () => {
  const { patientId, orderId } = useParams();
  const isNew = !orderId && !!patientId;

  return (
    <>
      Order: {orderId}, Patient: {patientId}, Neu: {isNew ? "Ja" : "Nein"}
    </>
  );
};
