import { useTranslation } from "react-i18next";
import { Error } from ".";

interface OrderNotFoundErrorProps {
  orderId: string | undefined;
}

export const OrderNotFoundError = ({ orderId }: OrderNotFoundErrorProps) => {
  const { t } = useTranslation();

  return (
    <Error
      title={t("translation:order.notFoundTitle")}
      subtitle={t("translation:order.notFoundSubtitle", { id: orderId })}
      status="error"
    />
  );
};
