import { useParams } from "react-router";

export const Order = () => {
  const { orderId } = useParams();
  const isNew = !orderId;

  return (
    <>
      Order: {orderId}, Neu: {isNew ? "Ja" : "Nein"}
    </>
  );
};
