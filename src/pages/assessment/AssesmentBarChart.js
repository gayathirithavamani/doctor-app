import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Row, Col, Skeleton, Card } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import "../style/dashboard.css";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppsIcon from "@mui/icons-material/Apps";

// let data = [
//   ["Task", "Hours per Day"],
//   ["Yes", 11],
//   ["No", 2],
//   ["Refused", 2],
// ];

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

const AssessmentBarView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [yesValue, setYesValue] = useState();
  const [noValue, setNoValue] = useState();
  const [yesValue1, setYesValue1] = useState();
  const [noValue1, setNoValue1] = useState();
  const [yesValue2, setYesValue2] = useState();
  const [noValue2, setNoValue2] = useState();
  const [yesValue3, setYesValue3] = useState();
  const [noValue3, setNoValue3] = useState();
  const [yesValue4, setYesValue4] = useState();
  const [noValue4, setNoValue4] = useState();
  const [yesValue5, setYesValue5] = useState();
  const [noValue5, setNoValue5] = useState();
  const [yesValue6, setYesValue6] = useState();
  const [noValue6, setNoValue6] = useState();
  const [yesValue7, setYesValue7] = useState();
  const [noValue7, setNoValue7] = useState();
  const [yesValue8, setYesValue8] = useState();
  const [noValue8, setNoValue8] = useState();
  const [yesValue9, setYesValue9] = useState();
  const [noValue9, setNoValue9] = useState();
  const [yesValue10, setYesValue10] = useState();
  const [noValue10, setNoValue10] = useState();
  const [nValue10, setNValue10] = useState();
  const [yesValue11, setYesValue11] = useState();
  const [noValue11, setNoValue11] = useState();
  const [skinValue1, setSkinValue1] = useState();
  const [skinValue2, setSkinValue2] = useState();
  const [skinValue3, setSkinValue3] = useState();
  const [skinValue4, setSkinValue4] = useState();
  const [single, setSingle] = useState();
  const [values, setValues] = useState([]);
  const [suprapublic, setSuprapublic] = useState();
  const [foley, setFoley] = useState();
  const [blank, setBlank] = useState();
  // const cardTitles = [
  //   "ADVANCED DIRECTIVES(S)",
  //   "ADVANCED DIRECTIVES(S)",
  //   "ADV CARE PLAN Loading",
  //   "ADV DOCTORS ORDERS Loading",
  //   "CATHETER Loading",
  //   "CATHETER TYPE Loading",
  //   "CATHETER CARE PLAN Loading",
  //   "CATHETER INDICATION Loading",
  //   "FALL RISK ASSESSMENT Loading",
  //   "FALL RISK CARE PLAN Loading",
  //   "SKIN RISK ASSESSMENT",
  //   "SKIN RISK CATEGORY ",
  //   "SKIN RISK SCORE",
  //   "SKIN RISK CARE PLAN",
  // ];

  // const RenderCards = () => {
  //   return cardTitles.map((title, index) => (
  //     <Col xxl={6} lg={6} xs={12} style={{ marginTop: "20px" }} key={index}>
  //       <Card title={title} bordered={false}>
  //         <Skeleton.Node active={true}>
  //           <PieChartOutlined
  //             style={{
  //               fontSize: 90,
  //               color: "#bfbfbf",
  //               justifyContent: "center",
  //               padding: "50px",
  //               margin: "20px",
  //             }}
  //           />
  //         </Skeleton.Node>
  //       </Card>
  //     </Col>
  //   ));
  // };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setValues(data);

        const blank = data.filter(
          (i) =>
            i.adv_DIR1 &&
            i.adv_DIR3 &&
            i.adv_DIR5 &&
            i.adv_DIR4 &&
            i.cat1 &&
            i.cat2 &&
            i.cat4 &&
            i.cat5 &&
            i.fall_RISK_1 &&
            i.fall_RISK_2 &&
            i.skin_RISK_1 &&
            i.skin_RISK_2 &&
            i.skin_RISK_3 &&
            i.skin_RISK_5 === null
        );

        setBlank(blank.length);

        const yesValue = data.filter((i) => i.adv_DIR1 === "Yes");
        const noValue = data.filter((i) => i.adv_DIR1 === "No");
        setYesValue(yesValue.length);
        setNoValue(noValue.length);
        const yesValue1 = data.filter((i) => i.adv_DIR3 === "Full Code");
        const noValue1 = data.filter((i) => i.adv_DIR3 === "DNR");
        setYesValue1(yesValue1.length);
        setNoValue1(noValue1.length);
        const yesValue2 = data.filter((i) => i.adv_DIR5 === "Yes");
        const noValue2 = data.filter((i) => i.adv_DIR5 === "No");
        setYesValue2(yesValue2.length);
        setNoValue2(noValue2.length);
        const yesValue3 = data.filter((i) => i.adv_DIR4 === "Yes");
        const noValue3 = data.filter((i) => i.adv_DIR4 === "No");
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);
        const yesValue4 = data.filter((i) => i.cat1 === "Yes");
        const noValue4 = data.filter((i) => i.cat1 === "No");
        setYesValue4(yesValue4.length);
        setNoValue4(noValue4.length);
        const yesValue5 = data.filter((i) => i.cat4 === "Yes");
        const noValue5 = data.filter((i) => i.cat4 === "No");
        setYesValue5(yesValue5.length);
        setNoValue5(noValue5.length);
        const yesValue6 = data.filter((i) => i.cat5 === "Yes");
        const noValue6 = data.filter((i) => i.cat5 === "No");
        setYesValue6(yesValue6.length);
        setNoValue6(noValue6.length);
        const yesValue7 = data.filter((i) => i.fall_RISK_1 === "Yes");
        const noValue7 = data.filter((i) => i.fall_RISK_1 === "No");
        setYesValue7(yesValue7.length);
        setNoValue7(noValue7.length);
        const yesValue8 = data.filter((i) => i.fall_RISK_2 === "Yes");
        const noValue8 = data.filter((i) => i.fall_RISK_2 === "No");
        setYesValue8(yesValue8.length);
        setNoValue8(noValue8.length);
        const yesValue9 = data.filter((i) => i.skin_RISK_1 === "Yes");
        const noValue9 = data.filter((i) => i.skin_RISK_1 === "No");
        setYesValue9(yesValue9.length);
        setNoValue9(noValue9.length);
        const yesValue10 = data.filter((i) => i.skin_RISK_2 === "Braden");
        const noValue10 = data.filter((i) => i.skin_RISK_2 === null);
        const nValue10 = data.filter((i) => i.skin_RISK_2 === "n/a");
        setYesValue10(yesValue10.length);
        setNoValue10(noValue10.length);
        setNValue10(nValue10.length);
        const yesValue11 = data.filter((i) => i.skin_RISK_5 === "Yes");
        const noValue11 = data.filter((i) => i.skin_RISK_5 === "No");
        setYesValue11(yesValue11.length);
        setNoValue11(noValue11.length);
        const skinValue1 = data.filter((i) => i.skin_RISK_3 === "n/a");
        const skinValue2 = data.filter(
          (i) => i.skin_RISK_3 === "Very High Risk"
        );
        const skinValue3 = data.filter((i) => i.skin_RISK_3 === "At Risk");
        const skinValue4 = data.filter(
          (i) => i.skin_RISK_3 === "Moderate Risk"
        );
        setSkinValue1(skinValue1.length);
        setSkinValue2(skinValue2.length);
        setSkinValue3(skinValue3.length);
        setSkinValue4(skinValue4.length);
        const suprapublic = data.filter((i) => i.cat2 === "Suprapublic");
        const foley = data.filter((i) => i.cat2 === "Foley");

        console.log(blank.length + "hii");
        setSuprapublic(suprapublic.length);
        setFoley(foley.length);
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
            {""}
            <Card title="ADVANCED DIRECTIVES(S)" bordered={false}>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.adv_DIR1, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue],
                        ["No", noValue],
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
            <Card title="ADVANCED DIRECTIVES(S) TYPES" bordered={false}>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.adv_DIR3, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Full Code", yesValue1],
                        ["DNR", noValue1],
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
            <Card title="ADV CARE PLAN" bordered={false}>
              <Link to="/adv1">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.adv_DIR5, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue2],
                        ["No", noValue2],
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
            <Card title="ADV DOCTOR ORDERS" bordered={false}>
              <Link to="/adv2">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.adv_DIR4, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue3],
                        ["No", noValue3],
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
            <Card title="CATHETER" bordered={false}>
              <Link to="/cat1">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.cat1, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue4],
                        ["No", noValue4],
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
            <Card title="CATHETER TYPE" bordered={false}>
              <Link to="/cat2">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.cat2, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Suprapublic", suprapublic],
                        ["Foley", foley],
                        ["Blank", blank],
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
            <Card title="CATHETER CARE PLAN" bordered={false}>
              <Link to="/cat3">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.cat4, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue5],
                        ["No", noValue5],
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
            <Card title="CATHETER INDICATION" bordered={false}>
              <Link
                to="/cat4
              "
              >
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.cat5, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue6],
                        ["No", noValue6],
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
            <Card title="FALL RISK ASSESMENT" bordered={false}>
              <Link to="/fall1">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.fall_RISK_1, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue7],
                        ["No", noValue7],
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
            <Card title="FALL RISK CARE PLAN" bordered={false}>
              <Link to="/fall2">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.fall_RISK_2, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue8],
                        ["No", noValue8],
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
            <Card title="SKIN RISK ASSESSMENT" bordered={false}>
              <Link to="/skin1">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.skin_RISK_1, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue9],
                        ["No", noValue9],
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
            <Card title="SKIN RISK CATEGORY" bordered={false}>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.skin_RISK_2, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Braden", yesValue10],
                        ["n/a", noValue10],
                        ["0", nValue10],
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
            <Card title="SKIN RISK SCORE" bordered={false}>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.skin_RISK_3, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["0", skinValue1],
                        ["Very High Risk", skinValue2],
                        ["At Risk", skinValue3],
                        ["Moderate Risk", skinValue4],
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
            <Card title="SKIN RISK CARE PLAN" bordered={false}>
              <Link to="/skin4">
                <AppsIcon
                  style={{
                    position: "absolute",
                    left: "320px",
                    top: "17px",
                  }}
                />
              </Link>
              <Chart
                chartType="PieChart"
                data={
                  single
                    ? [
                        ["Task", "Hours per Day"],
                        [single.skin_RISK_5, "1"],
                      ]
                    : [
                        ["Task", "Hours per Day"],
                        ["Yes", yesValue11],
                        ["No", noValue11],
                        ["blank", blank],
                      ]
                }
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ height: "895px" }}>
        <div style={{ height: "25%" }}></div>
        <div style={{ overflowY: "scroll" }}>
          <div style={{ width: "100%" }}>
            <FilterAltIcon
              onClick={() => {
                setSingle();
              }}
              style={{
                cursor: "pointer",
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
export default AssessmentBarView;
