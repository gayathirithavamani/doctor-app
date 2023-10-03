import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "../style/dashboard.css";
import { Row, Col, Card } from "antd";
import DateRangeIcon from "@mui/icons-material/DateRange";

let data2 = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
  // CSS-style declaration
];

const options1 = {
  title: null,
  is3D: false,
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

function DashboardCovid() {
  const [isLoading, setIsLoading] = useState(true);

  const [yesValue2, setYesValue2] = useState();
  const [noValue2, setNoValue2] = useState();
  const [refusedValue2, setRefusedValue2] = useState();

  const [tableDataShow, setTableDataShow] = useState(false);
  const [clickChartValue, setClickChartValue] = useState("");
  const [result, setResult] = useState([]);
  const [tableResult, setTableResult] = useState([]);
  const [yesValueShow, setYesValueShow] = useState(true);
  const [noValueShow, setNoValueShow] = useState(true);
  const [refusedValueShow, setRefusedValueShow] = useState(true);

  // const tableDataClick = (clickValue) => {
  //   setClickChartValue(clickValue);
  //   setTableDataShow(true);
  //   const value = result.filter((i) => i.imm_COVID_Y === clickValue);
  //   setTableResult(value);
  // };
  const tableDataClick = (clickValue) => {
    setClickChartValue(clickValue);
    // console.log("hhhh", clickValue);

    setTableDataShow(true);
    if (clickValue == "Yes") {
      setYesValueShow(true);
      setRefusedValueShow(false);
      setNoValueShow(false);
    }
    if (clickValue == "No") {
      setYesValueShow(false);
      setRefusedValueShow(false);
      setNoValueShow(true);
    }
    if (clickValue == "Refused") {
      setYesValueShow(false);
      setRefusedValueShow(true);
      setNoValueShow(false);
    }
    if (clickValue == "data") {
      setYesValueShow(true);
      setRefusedValueShow(true);
      setNoValueShow(true);
    }
    if (clickValue == "data") {
      setTableResult(result);
    } else {
      const value = result.filter((i) => i.imm_COVID_Y === clickValue);
      setTableResult(value);
    }

    // const value = result.filter((i) => i.imm_PNEUMO_Y === clickValue);
    // setTableResult(value);
  };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue2 = data.filter((i) => i.imm_COVID_Y === "Yes");
        const noValue2 = data.filter((i) => i.imm_COVID_Y === "No");
        const refusedValue2 = data.filter((i) => i.imm_COVID_Y === "Refused");
        setTableResult(data);
        setYesValue2(yesValue2.length);
        setNoValue2(noValue2.length);
        setRefusedValue2(refusedValue2.length);
        console.log(yesValue2);
        console.log(noValue2);
        console.log(refusedValue2);

        data = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue2.length],
          ["No", noValue2.length],
          ["Refused", refusedValue2.length],
        ];
        setIsLoading(false);
      });

    // console.log(data);
  }, []);

  return (
    <div>
      <h1>welcome to grid</h1>
      <Row gutter={28}>
        <>
          <Col xxl={12} lg={12} xs={24}>
            <Card title="COVID VACCINE 1" bordered={false}>
              <div className="chart-container">
                <Chart
                  chartType="PieChart"
                  data={
                    (data2 = [
                      ["Task", "Hours per Day"],
                      ["Yes", yesValue2],
                      ["No", noValue2],
                      ["Refused", refusedValue2],
                    ])
                  }
                  options={options1}
                  width={"100%"}
                  height={"400px"}
                />
                <div className="lable-container">
                  <span
                    onClick={() => tableDataClick("data")}
                    className="chart-lable yesLable"
                  >
                    <DateRangeIcon />
                  </span>
                  <span
                    onClick={() => tableDataClick("Yes")}
                    className="chart-lable yesLable"
                  >
                    Yes
                  </span>
                  <span
                    onClick={() => tableDataClick("No")}
                    className="chart-lable noLable"
                  >
                    No
                  </span>
                  <span
                    onClick={() => tableDataClick("Refused")}
                    className="chart-lable refLable"
                  >
                    Refused
                  </span>
                </div>
              </div>
            </Card>
          </Col>

          <Col xxl={8} lg={8} xs={24}>
            <Card title="COVID VACCINE 1 DATA LIST" bordered={false}>
              <div className="tableWrapper table-responsive ">
                <table>
                  {/* <tr>
                    <th>PATIENT NAME</th>
                    <th>{clickChartValue}</th>
                  </tr> */}
                  <tr>
                    <th>PATIENT NAME</th>
                    {yesValueShow ? <th>Yes</th> : null}
                    {noValueShow ? <th>No</th> : null}
                    {refusedValueShow ? <th>Refused</th> : null}
                    {/* <th>{clickChartValue}</th> */}
                  </tr>

                  {tableResult.map((item) => (
                    <tr key={item.id}>
                      <td>{item.patientname}</td>
                      {yesValueShow ? (
                        <td>
                          {item.imm_COVID_Y === "Yes" ? (
                            <CheckIcon />
                          ) : (
                            <CloseIcon />
                          )}
                        </td>
                      ) : null}
                      {noValueShow ? (
                        <td>
                          {item.imm_COVID_Y === "No" ? (
                            <CheckIcon />
                          ) : (
                            <CloseIcon />
                          )}
                        </td>
                      ) : null}
                      {refusedValueShow ? (
                        <td>
                          {item.imm_COVID_Y === "Refused" ? (
                            <CheckIcon />
                          ) : (
                            <CloseIcon />
                          )}
                        </td>
                      ) : null}
                    </tr>
                  ))}

                  {/* {tableTesult.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.patientname}</td>
                        <td>{clickChartValue}</td>
          
                      </tr>
                    );
                  })} */}
                </table>
              </div>
            </Card>
          </Col>
          {/* ) : null} */}
        </>
      </Row>
    </div>
  );
}
export default DashboardCovid;
