import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Row, Col, Skeleton, Card } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import "../style/dashboard.css";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppsIcon from "@mui/icons-material/Apps";

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
  const [values, setValues] = useState([]);
  const [single, setSingle] = useState();
  const [blank, setBlank] = useState();

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
  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        setValues(data);

        const yesValue = data.filter((i) => i.imm_PNEUMO_Y === "Yes");
        const noValue = data.filter((i) => i.imm_PNEUMO_Y === "No");
        const refusedValue = data.filter((i) => i.imm_PNEUMO_Y === "Refused");
        const blank = data.filter(
          (i) =>
            i.imm_PNEUMO_Y &&
            i.imm_FLU_Y &&
            i.imm_COVID_Y &&
            i.imm_COVID_Y2 &&
            i.imm_COVID_Y3 === null
        );

        setBlank(blank.length);
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

        const yesValue3 = data.filter((i) => i.imm_COVID_Y2 === "Yes");
        const noValue3 = data.filter((i) => i.imm_COVID_Y2 === "No");
        const refusedValue3 = data.filter((i) => i.imm_COVID_Y2 === "Refused");
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);
        setRefusedValue3(refusedValue3.length);

        const yesValue4 = data.filter((i) => i.imm_COVID_Y3 === "Yes");
        const noValue4 = data.filter((i) => i.imm_COVID_Y3 === "No");
        const refusedValue4 = data.filter((i) => i.imm_COVID_Y3 === "Refused");
        setYesValue4(yesValue4.length);
        setNoValue4(noValue4.length);
        setRefusedValue4(refusedValue4.length);

        setIsLoading(false);
      });
  }, []);

  function handleClick(id) {
    const data = values.find((item) => item.id === id);
    console.log(data);
    setSingle(data);
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Row gutter={16}>
          <Col span={8}>
            {" "}
            <Card title="PNEUMOCOCCAL" bordered={false}>
              <Link to="/dashboardCovid">
                <AppsIcon
                  style={{ position: "absolute", left: "326px", top: "14px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.imm_PNEUMO_Y, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue],
                        ["No", noValue],
                        ["Refused", refusedValue],
                        ["blank", blank],
                      ]
                }
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Card>
          </Col>
          <Col span={8}>
            {" "}
            <Card title="INFLUENZA" bordered={false}>
              <Link to="/dashboardCovid">
                <AppsIcon
                  style={{ position: "absolute", left: "326px", top: "14px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.imm_FLU_Y, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue1],
                        ["No", noValue1],
                        ["Refused", refusedValue1],
                        ["blank", blank],
                      ]
                }
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Card>
          </Col>
          <Col span={8} style={{ marginBottom: "10px" }}></Col>
          <Col span={8}>
            {" "}
            <Card title="COVID VACCINE 1" bordered={false}>
              <Link to="/dashboardCovid">
                <AppsIcon
                  style={{ position: "absolute", left: "326px", top: "14px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.imm_COVID_Y, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue2],
                        ["No", noValue2],
                        ["Refused", refusedValue2],
                       ["blank", blank], 
                      ]
                }
                options={options1}
              />
            </Card>
          </Col>
          <Col span={8}>
            {" "}
            <Card title="COVID VACCINE 2" bordered={false}>
              <Link to="/dashboardCovid2">
                <AppsIcon
                  style={{ position: "absolute", left: "326px", top: "14px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.imm_COVID_Y2, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue3],
                        ["No", noValue3],
                        ["Refused", refusedValue3],
                        ["blank", blank],
                      ]
                }
                options={options1}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="COVID BOOSTER" bordered={false}>
              <Link to="/dashboardBooster">
                <AppsIcon
                  style={{ position: "absolute", left: "326px", top: "14px" }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.imm_COVID_Y3, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue4],
                        ["No", noValue4],
                        ["Refused", refusedValue4],
                        ["blank", blank],
                      ]
                }
                options={options1}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ height: "895px" }}>
        <div style={{ height: "25%" }}></div>
        <div style={{ height: "75%", overflowY: "scroll" }}>
          <div style={{ width: "100%" }}>
            <FilterAltIcon
              onClick={() => {
                setSingle();
              }}
              style={{
                cursor: "pointer",
                width: "20%",
                alignItems: "end",
                display: "flex",
                justifyContent: "end",
              }}
            />
          </div>
          {values.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <li style={{ listStyleType: "none" }}>
                  <button
                    style={{ width: "100px", height: "30px", fontSize: "9px" }}
                    onClick={() => handleClick(item.id)}
                  >
                    {item.patientname}
                  </button>
                </li>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
