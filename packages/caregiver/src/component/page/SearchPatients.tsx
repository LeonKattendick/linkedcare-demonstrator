import { EyeOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table, Tooltip } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { renderAddress, renderBirthDate } from "core/src/util/renderUtil";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useGetCaregiverPatients } from "../../hook/useGetCaregiverPatients";

const compare = (search: string, patient: Patient) => {
  if (!search) return true;

  const includesName = !!patient.name.find((v) => v.text.toLowerCase().includes(search));

  return includesName;
};

export const SearchPatients = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          <Table.Column
            title={t("searchPatients.table.name")}
            render={(_, record: Patient) => (
              <Tooltip title={t("searchPatients.table.tooltipView")}>
                <Link to={`/patient/${record.id}`}>{record.name.find((v) => v.use === "official")!.text}</Link>
              </Tooltip>
            )}
            sorter={(a, b) =>
              a.name
                .find((v) => v.use === "official")!
                .text.localeCompare(b.name.find((v) => v.use === "official")!.text)
            }
          />
          <Table.Column
            title={t("searchPatients.table.gender")}
            render={(_, record: Patient) => t(`searchPatients.table.${record.gender}`)}
            sorter={(a, b) => a.gender.localeCompare(b.gender)}
          />
          <Table.Column
            title={t("searchPatients.table.birthDate")}
            render={(_, record: Patient) => renderBirthDate(record.birthDate)}
            sorter={(a, b) => (dayjs(a.birthDate).isBefore(dayjs(b.birthDate)) ? -1 : 1)}
          />
          <Table.Column
            title={t("searchPatients.table.address")}
            render={(_, record: Patient) => renderAddress(record.address[0])}
          />
          <Table.Column
            title={t("general.actions")}
            render={(_, record: Patient) => (
              <Space>
                <Tooltip title={t("searchPatients.table.tooltipView")}>
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={() => navigate(`/patient/${record.id}`)}
                  />
                </Tooltip>
                <Tooltip title={t("searchPatients.table.tooltipCreate")}>
                  <Button
                    type="primary"
                    icon={<MedicineBoxOutlined />}
                    size="small"
                    onClick={() => navigate(`/create/${record.id}`)}
                  />
                </Tooltip>
              </Space>
            )}
          />
        </Table>
      </Space>
    </Card>
  );
};