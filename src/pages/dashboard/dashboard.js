import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Row, Col, Skeleton, Card } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import "../style/dashboard.css";
import { Link } from "react-router-dom";

import AppsIcon from "@mui/icons-material/Apps";

let data = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
];

let data1 = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
];

let data2 = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
];

let data3 = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
];

let data4 = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
];

const options = {
  title: null,
  is3D: true,
  legend: { position: "bottom", alignment: "center" },
  pieSliceText: "value",
  fontSize: 14,
  chartArea: { width: 400, height: 300 },
  pieHole: 0.25,
  pieStartAngle: 0,
  animation: {
    startup: true,
    duration: 2000,
    easing: "out",
  },
};

const options1 = {
  title: null,
  is3D: false,
  legend: { position: "bottom", alignment: "center" },
  pieSliceText: "value",
  fontSize: 14,
  slices: {
    0: { color: "#E74C3C" },
    1: { color: "#3498DB" },
    2: { color: "#C39BD3" },
    // 3: { color: "#3499ba" },
    // 4: { color: "#698b47" },
    // 5: { color: "#402d21" },
  },
  chartArea: { width: 400, height: 300 },
  pieHole: 0.25,
  pieStartAngle: 0,
  animation: {
    startup: true,
    duration: 2000,
    easing: "out",
  },
};

const options3dfalse = {
  title: null,
  legend: { position: "bottom", alignment: "center" },
  pieSliceText: "value",
  fontSize: 14,
  chartArea: { width: 400, height: 300 },
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [yesValue, setYesValue] = useState();
  const [noValue, setNoValue] = useState();
  const [refusedValue, setRefusedValue] = useState();
  const [yesValue1, setYesValue1] = useState();
  const [noValue1, setNoValue1] = useState();
  const [refusedValue1, setRefusedValue1] = useState();
  const [yesValue2, setYesValue2] = useState();
  const [noValue2, setNoValue2] = useState();
  const [refusedValue2, setRefusedValue2] = useState();
  const [yesValue3, setYesValue3] = useState();
  const [noValue3, setNoValue3] = useState();
  const [refusedValue3, setRefusedValue3] = useState();
  const [yesValue4, setYesValue4] = useState();
  const [noValue4, setNoValue4] = useState();
  const [refusedValue4, setRefusedValue4] = useState();

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const yesValue = data.filter((i) => i.imm_PNEUMO_Y === "Yes");
        const noValue = data.filter((i) => i.imm_PNEUMO_Y === "No");
        const refusedValue = data.filter((i) => i.imm_PNEUMO_Y === "Refused");
        setYesValue(yesValue.length);
        setNoValue(noValue.length);
        setRefusedValue(refusedValue.length);

        const yesValue1 = data.filter((i) => i.imm_FLU_Y === "Yes");
        const noValue1 = data.filter((i) => i.imm_FLU_Y === "No");
        const refusedValue1 = data.filter((i) => i.imm_FLU_Y === "Refused");
        setYesValue1(yesValue1.length);
        setNoValue1(noValue1.length);
        setRefusedValue1(refusedValue1.length);

        const yesValue2 = data.filter((i) => i.imm_COVID_Y === "Yes");
        const noValue2 = data.filter((i) => i.imm_COVID_Y === "No");
        const refusedValue2 = data.filter((i) => i.imm_COVID_Y === "Refused");
        setYesValue2(yesValue2.length);
        setNoValue2(noValue2.length);
        setRefusedValue2(refusedValue2.length);
        console.log(refusedValue2.length);
        console.log(noValue2.length);
        console.log(yesValue2.length);

        const yesValue3 = data.filter((i) => i.imm_COVID_Y2 === "Yes");
        const noValue3 = data.filter((i) => i.imm_COVID_Y2 === "No");
        const refusedValue3 = data.filter((i) => i.imm_COVID_Y2 === "Refused");
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);
        setRefusedValue3(refusedValue3.length);
        console.log(refusedValue3.length);
        console.log(noValue3.length);
        console.log(refusedValue3.length);

        const yesValue4 = data.filter((i) => i.imm_COVID_Y3 === "Yes");
        const noValue4 = data.filter((i) => i.imm_COVID_Y3 === "No");
        const refusedValue4 = data.filter((i) => i.imm_COVID_Y3 === "Refused");
        setYesValue4(yesValue4.length);
        setNoValue4(noValue4.length);
        setRefusedValue4(refusedValue4.length);
        console.log(refusedValue4.length);
        console.log(noValue4.length);
        console.log(refusedValue4.length);

        data = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue.length],
          ["No", noValue.length],
          ["Refused", refusedValue.length],
        ];
        data1 = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue1.length],
          ["No", noValue1.length],
          ["Refused", refusedValue1.length],
        ];
        data2 = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue2.length],
          ["No", noValue2.length],
          ["Refused", refusedValue2.length],
        ];
        data3 = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue3.length],
          ["No", noValue3.length],
          ["Refused", refusedValue3.length],
        ];
        data4 = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue4.length],
          ["No", noValue4.length],
          ["Refused", refusedValue4.length],
        ];
        setIsLoading(false);
      });

    // console.log(data);
  }, []);

  return (
    <Row gutter={28}>
      {isLoading ? (
        <>
          <Col xxl={8} lg={8} xs={24}>
            <Card title="PNEUMOCOCCAL" bordered={false}>
              <Skeleton.Node active={true}>
                <PieChartOutlined
                  style={{
                    fontSize: 90,
                    color: "#bfbfbf",
                    justifyContent: "center",
                  }}
                />
              </Skeleton.Node>
            </Card>
          </Col>
          <Col xxl={8} lg={8} xs={24}>
            <Card title="INFLUENZA" bordered={false}>
              <Skeleton.Node active={true}>
                <PieChartOutlined
                  style={{
                    fontSize: 90,
                    color: "#bfbfbf",
                    justifyContent: "center",
                  }}
                />
              </Skeleton.Node>
            </Card>
          </Col>
          <Col xxl={8} lg={8} xs={24}>
            <Card title="Donut Chart (3D) Loading ..." bordered={false}>
              <Skeleton.Node active={true}>
                <PieChartOutlined
                  style={{
                    fontSize: 90,
                    color: "#bfbfbf",
                    justifyContent: "center",
                  }}
                />
              </Skeleton.Node>
            </Card>
          </Col>
          <Col xxl={8} lg={8} xs={24}>
            <Card title="Donut Chart (3D) Loading ..." bordered={false}>
              <Skeleton.Node active={true}>
                <PieChartOutlined
                  style={{
                    fontSize: 90,
                    color: "#bfbfbf",
                    justifyContent: "center",
                    padding: "50px",
                  }}
                />
              </Skeleton.Node>
            </Card>
          </Col>
          <Col xxl={8} lg={8} xs={24}>
            <Card title="Donut Chart (3D) Loading ..." bordered={false}>
              <Skeleton.Node active={true}>
                <PieChartOutlined
                  style={{
                    fontSize: 90,
                    color: "#bfbfbf",
                    justifyContent: "center",
                    padding: "50px",
                    margin: "20px",
                  }}
                />
              </Skeleton.Node>
            </Card>
          </Col>
        </>
      ) : (
        <>
          <Col xxl={8} lg={8} xs={24}>
            <Card title="PNEUMOCOCCAL" bordered={false}>
              <Link to="/dashboardView">
                <AppsIcon
                  style={{ position: "absolute", left: "340px", top: "20px" }}
                />
              </Link>

              <Chart
                chartType="PieChart"
                data={
                  (data = [
                    ["Task", "Hours per Day"],
                    ["Yes", yesValue],
                    ["No", noValue],
                    ["Refused", refusedValue],
                  ])
                }
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Card>
          </Col>

          <Col xxl={8} lg={8} xs={24}>
            <Card title="INFLUENZA" bordered={false}>
              <Link to="/dashboardDonut">
                <AppsIcon
                  style={{ position: "absolute", left: "340px", top: "20px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  (data1 = [
                    ["Task", "Hours per Day"],
                    ["Yes", yesValue1],
                    ["No", noValue1],
                    ["Refused", refusedValue1],
                  ])
                }
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Card>
          </Col>

          <Col xxl={8} lg={8} xs={24}>
            <Card title="COVID VACCINE 1" bordered={false}>
              <Link to="/dashboardCovid">
                <AppsIcon
                  style={{ position: "absolute", left: "340px", top: "20px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={
                  (data2 = [
                    ["Task", "Hours per Day"],
                    ["Yes", yesValue2],
                    ["No", noValue2],
                    ["Refused", refusedValue2],
                  ])
                }
                options={options1}
              />
            </Card>
          </Col>

          <Col xxl={8} lg={8} xs={24}>
            <Card title="COVID VACCINE 2" bordered={false}>
              <Link to="/dashboardCovid2">
                <AppsIcon
                  style={{ position: "absolute", left: "340px", top: "20px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={
                  (data2 = [
                    ["Task", "Hours per Day"],
                    ["Yes", yesValue3],
                    ["No", noValue3],
                    ["Refused", refusedValue3],
                  ])
                }
                options={options1}
              />
            </Card>
          </Col>

          <Col xxl={8} lg={8} xs={24}>
            <Card title="COVID BOOSTER" bordered={false}>
              <Link to="/dashboardBooster">
                <AppsIcon
                  style={{ position: "absolute", left: "340px", top: "20px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={
                  (data2 = [
                    ["Task", "Hours per Day"],
                    ["Yes", yesValue4],
                    ["No", noValue4],
                    ["Refused", refusedValue4],
                  ])
                }
                options={options1}
              />
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
};
export default Dashboard;
