import { EyeOutlined, FileAddOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table, Tooltip } from "antd";
import { Patient } from "core/src/interface/linca/Patient";
import { renderAddress, renderBirthDate } from "core/src/util/renderUtil";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface SearchPatientsProps {
  patients: Patient[];
  isPatientsLoading: boolean;
  showCreateButton?: boolean;
}

const compare = (search: string, patient: Patient) => {
  if (!search) return true;

  const includesName = !!patient.name.find((v) => v.text.toLowerCase().includes(search));
  const includesBirthDate = dayjs(patient.birthDate).format("DD.MM.YYYY").includes(search);

  return includesName || includesBirthDate;
};

export const SearchPatients = ({ patients, isPatientsLoading, showCreateButton }: SearchPatientsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((v) => compare(search.toLowerCase().trim(), v));

  return (
    <Card style={{ height: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          style={{ width: "25%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("translation:searchPatients.placeholder")}
        />
        <Table dataSource={filteredPatients} bordered loading={isPatientsLoading} size="middle" rowKey={(v) => v.id!}>
          <Table.Column
            title={t("translation:searchPatients.table.name")}
            render={(_, record: Patient) => (
              <Tooltip title={t("translation:searchPatients.table.tooltipView")}>
                <Link to={`/patient/${record.id}`}>{record.name[0]?.text}</Link>
              </Tooltip>
            )}
            sorter={(a, b) => a.name[0]?.text.localeCompare(b.name[0]?.text)}
          />
          <Table.Column
            title={t("translation:searchPatients.table.gender")}
            render={(_, record: Patient) => t(`general.gender.${record.gender}`)}
            sorter={(a, b) => a.gender.localeCompare(b.gender)}
          />
          <Table.Column
            title={t("translation:searchPatients.table.birthDate")}
            render={(_, record: Patient) => renderBirthDate(record.birthDate)}
            sorter={(a, b) => (dayjs(a.birthDate).isBefore(dayjs(b.birthDate)) ? -1 : 1)}
          />
          <Table.Column
            title={t("translation:searchPatients.table.address")}
            render={(_, record: Patient) => renderAddress(record.address[0])}
          />
          <Table.Column
            title={t("translation:general.actions")}
            render={(_, record: Patient) => (
              <Space>
                <Tooltip title={t("translation:searchPatients.table.tooltipView")}>
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={() => navigate(`/patient/${record.id}`)}
                  />
                </Tooltip>
                {showCreateButton && (
                  <Tooltip title={t("translation:searchPatients.table.tooltipCreate")}>
                    <Button
                      type="primary"
                      icon={<FileAddOutlined />}
                      size="small"
                      onClick={() => navigate(`/create/${record.id}`)}
                    />
                  </Tooltip>
                )}
              </Space>
            )}
          />
        </Table>
      </Space>
    </Card>
  );
};
