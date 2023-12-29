import { App } from "antd";
import { useTranslation } from "react-i18next";
import { RequestOrchestration } from "../../interface/linca/RequestOrchestration";
import { createRequestOrchestration } from "../../service/requestOrchestrationService";

export const useRequestOrchestrationApiAdapter = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const createOrchestrationWithInfo = async (o: RequestOrchestration) => {
    try {
      const res = await createRequestOrchestration(o);
      message.success(t("translation:order.create.success", { id: res.id }));

      return res;
    } catch (e) {
      message.error(t("translation:order.create.error"));
    }
  };

  return { createOrchestrationWithInfo };
};
