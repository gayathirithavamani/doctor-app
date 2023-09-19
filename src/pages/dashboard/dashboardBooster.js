// import React from 'react'

// function DashboardBooster () {
//   return (
//     <div>Welcome to dashboardBooster!.........</div>
//   )
// }

// export default DashboardBooster;

import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "../style/dashboard.css";
import { Row, Col, Card } from "antd";

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

function DashboardBooster() {
  const [isLoading, setIsLoading] = useState(true);

  const [yesValue4, setYesValue4] = useState();
  const [noValue4, setNoValue4] = useState();
  const [refusedValue4, setRefusedValue4] = useState();

  const [tableDataShow, setTableDataShow] = useState(false);
  const [clickChartValue, setClickChartValue] = useState("");
  const [result, setResult] = useState([]);
  const [tableResult, setTableResult] = useState([]);

  const tableDataClick = (clickValue) => {
    setClickChartValue(clickValue);
    setTableDataShow(true);
    const value = result.filter((i) => i.imm_COVID_Y3 === clickValue);
    setTableResult(value);
  };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue4 = data.filter((i) => i.imm_COVID_Y3 === "Yes");
        const noValue4 = data.filter((i) => i.imm_COVID_Y3 === "No");
        const refusedValue4 = data.filter((i) => i.imm_COVID_Y3 === "Refused");
        setTableResult(data);
        setYesValue4(yesValue4.length);
        setNoValue4(noValue4.length);
        setRefusedValue4(refusedValue4.length);
        console.log(yesValue4);
        console.log(noValue4);
        console.log(refusedValue4);

        data = [
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
    <div>
      <h1>welcome to grid</h1>
      <Row gutter={28}>
        <>
          <Col xxl={12} lg={12} xs={24}>
            <Card title="COVID BOOSTER" bordered={false}>
              <div className="chart-container">
                <Chart
                  chartType="PieChart"
                  data={
                    (data2 = [
                      ["Task", "Hours per Day"],
                      ["Yes", yesValue4],
                      ["No", noValue4],
                      ["Refused", refusedValue4],
                    ])
                  }
                  options={options1}
                  width={"100%"}
                  height={"400px"}
                />
                <div className="lable-container">
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
            <Card title="COVID BOOSTER DATA LIST" bordered={false}>
              <div className="tableWrapper table-responsive ">
                <table>
                  {/* <tr>
                    <th>PATIENT NAME</th>
                    <th>{clickChartValue}</th>
                  </tr> */}
                  <tr>
                    <th>PATIENT NAME</th>
                    <th>Yes</th>
                    <th>No</th>
                    <th>Refused</th>
                    {/* <th>{clickChartValue}</th> */}
                  </tr>

                  {tableResult.map((item) => (
                    <tr key={item.id}>
                      <td>{item.patientname}</td>
                      <td>
                        {item.imm_COVID_Y3 === "Yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                      <td>
                        {item.imm_COVID_Y3 === "No" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                      <td>
                        {item.imm_COVID_Y3 === "Refused" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
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
export default DashboardBooster;
