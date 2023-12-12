import { Card, Input, Space, Table } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { renderAddress, renderBirthDate } from "core/src/util/renderUtil";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCaregiverPatients } from "../../hook/useGetCaregiverPatients";

const compare = (search: string, patient: Patient) => {
  if (!search) return true;

  const includesName = !!patient.name.find((v) => v.text.toLowerCase().includes(search));

  return includesName;
};

export const SearchPatients = () => {
  const { t } = useTranslation();
  const { patients, isPatientsLoading } = useGetCaregiverPatients();

  const [search, setSearch] = useState("");

  const filteredPatients = patients
    .filter((v) => compare(search.toLowerCase().trim(), v))
    .map((v) => ({ key: v.id, ...v }));

  return (
    <Card style={{ height: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          style={{ width: "25%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPatients.placeholder")}
        />
        <Table dataSource={filteredPatients} bordered loading={isPatientsLoading} size="middle">
          <Table.Column title={t("searchPatients.table.name")} render={(_, record: Patient) => record.name[0].text} />
          <Table.Column
            title={t("searchPatients.table.gender")}
            render={(_, record: Patient) => t(`searchPatients.table.${record.gender}`)}
          />
          <Table.Column
            title={t("searchPatients.table.birthDate")}
            render={(_, record: Patient) => renderBirthDate(record.birthDate)}
          />
          <Table.Column
            title={t("searchPatients.table.address")}
            render={(_, record: Patient) => renderAddress(record.address[0])}
          />
          <Table.Column title={t("general.actions")} render={(_, record: Patient) => <>{record.id}</>} />
        </Table>
      </Space>
    </Card>
  );
};
