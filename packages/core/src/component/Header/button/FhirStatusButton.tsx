import { FireTwoTone } from "@ant-design/icons";
import { Button, Tooltip, theme } from "antd";
import { useTranslation } from "react-i18next";
import { useGetMetadata } from "../../../hook/useGetMetadata";

export const FhirStatusButton = () => {
  const { metadata, isMetadataSuccess } = useGetMetadata();
  const { token } = theme.useToken();
  const { t } = useTranslation();

  return (
    <Tooltip
      title={
        isMetadataSuccess ? (
          <>
            Status: {metadata?.status}
            <br />
            FHIR Version: {metadata?.fhirVersion}
          </>
        ) : (
          t("connectionFailed")
        )
      }
    >
      <Button
        type="primary"
        danger={!isMetadataSuccess}
        style={{
          backgroundColor: isMetadataSuccess ? token.colorBgContainer : "",
          borderColor: isMetadataSuccess ? token.colorBorder : "",
        }}
        icon={<FireTwoTone twoToneColor={"orange"} />}
      />
    </Tooltip>
  );
};
