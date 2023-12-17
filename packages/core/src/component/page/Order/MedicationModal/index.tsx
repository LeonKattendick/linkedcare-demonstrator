import { Col, Divider, Modal, Row, Select, Table } from "antd";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../../../../interface/ModalProps";
import { BaseMedicationRequest } from "../../../../interface/linca/BaseMedicationRequest";
import { SelectFromMedicationPlan } from "./SelectFromMedicationPlan";
import { SelectFromOtherOrders } from "./SelectFromOtherOrders";

interface MedicationModalProps extends ModalProps {
  isCreate: boolean;
  request?: BaseMedicationRequest;
  setRequest: (r: BaseMedicationRequest) => void;
}

export const MedicationModal = (props: MedicationModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={props.open}
      onCancel={() => props.setOpen(false)}
      title={t(
        props.isCreate
          ? "translation:order.medicationTable.modal.createTitle"
          : "translation:order.medicationTable.modal.addTitle"
      )}
      width="50%"
      okText={t("translation:general.save")}
    >
      {props.isCreate && (
        <>
          <Divider orientation="left">{t("translation:order.medicationTable.modal.selectsDivider")}</Divider>
          <SelectFromOtherOrders />
          <SelectFromMedicationPlan />
        </>
      )}
      <Divider orientation="left">{t("translation:order.medicationTable.modal.detailsDivider")}</Divider>
      <Row gutter={[16, 16]}>
        <Col span={6} style={{ display: "flex", alignItems: "center" }}>
          {t("translation:order.medicationTable.modal.medication")}
        </Col>
        <Col span={18}>
          <Select />
        </Col>
        <Col span={24}>
          <Table />
        </Col>
      </Row>
    </Modal>
  );
};
