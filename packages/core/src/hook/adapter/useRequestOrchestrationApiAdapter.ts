import { App } from "antd";
import { useTranslation } from "react-i18next";
import { RequestOrchestration } from "../../interface/linca/RequestOrchestration";
import { createRequestOrchestration, updateRequestOrchestration } from "../../service/requestOrchestrationService";
import { useGetAllRequestOrchestrations } from "../query/useGetAllRequestOrchestrations";
import { useGetRequestOrchestrationById } from "../query/useGetRequestOrchestrationById";

export const useRequestOrchestrationApiAdapter = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { invalidateAllRequestOrchestrations } = useGetAllRequestOrchestrations();
  const { invalidateOrderById } = useGetRequestOrchestrationById();

  const createOrchestrationWithInfo = async (o: RequestOrchestration) => {
    try {
      const res = await createRequestOrchestration(o);
      message.success(t("translation:order.create.success", { id: res.id }));
      invalidateAllRequestOrchestrations();

      return res;
    } catch (e) {
      message.error(t("translation:order.create.error"));
    }
  };

  const completeOrchestrationWithInfo = async (o: RequestOrchestration) => {
    const clone = structuredClone(o);
    clone.status = "completed";

    try {
      const res = await updateRequestOrchestration(clone);
      message.success(t("translation:order.complete.success", { id: res.id }));
      invalidateAllRequestOrchestrations();
      invalidateOrderById(res.id!);

      return res;
    } catch (e) {
      message.error(t("translation:order.complete.error", { id: clone.id }));
    }
  };

  const revokeOrchestrationWithInfo = async (o: RequestOrchestration) => {
    const clone = structuredClone(o);
    clone.status = "revoked";

    try {
      const res = await updateRequestOrchestration(clone);
      message.success(t("translation:order.revoke.success", { id: res.id }));
      invalidateAllRequestOrchestrations();
      invalidateOrderById(res.id!);

      return res;
    } catch (e) {
      message.error(t("translation:order.revoke.error", { id: clone.id }));
    }
  };

  return { createOrchestrationWithInfo, completeOrchestrationWithInfo, revokeOrchestrationWithInfo };
};
