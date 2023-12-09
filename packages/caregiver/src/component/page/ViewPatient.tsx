import { Card, Flex } from "antd";
import { useParams } from "react-router";

export const ViewPatient = () => {
  const { patientId } = useParams();

  return (
    <Flex gap={16} vertical style={{ height: "100%" }}>
      <Card>Patient: {patientId} </Card>
      <Flex gap={16} style={{ height: "100%" }}>
        <Card style={{ width: "100%", height: "100%" }}>test</Card>
        <Flex gap={16} vertical style={{ width: "100%", height: "100%" }}>
          <Card style={{ height: "100%" }}>test</Card>
          <Card style={{ height: "100%" }}>test</Card>
        </Flex>
      </Flex>
    </Flex>
  );
};
