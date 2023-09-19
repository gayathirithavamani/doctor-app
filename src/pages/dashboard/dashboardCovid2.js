// import React from 'react'

// function DashboardCovid2 () {
//   return (
//     <div>
//       welcome to covid vaccine 2!........
//     </div>
//   )
// }

// export default DashboardCovid2

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
  //   ["Refused", 2],
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

function DashboardCovid2() {
  const [isLoading, setIsLoading] = useState(true);

  const [yesValue3, setYesValue3] = useState();
  const [noValue3, setNoValue3] = useState();
  const [refusedValue3, setRefusedValue3] = useState();

  const [tableDataShow, setTableDataShow] = useState(false);
  const [clickChartValue, setClickChartValue] = useState("");
  const [result, setResult] = useState([]);
  const [tableResult, setTableResult] = useState([]);

  const tableDataClick = (clickValue) => {
    setClickChartValue(clickValue);
    setTableDataShow(true);
    const value = result.filter((i) => i.imm_COVID_Y2 === clickValue);
    setTableResult(value);
  };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue3 = data.filter((i) => i.imm_COVID_Y2 === "Yes");
        const noValue3 = data.filter((i) => i.imm_COVID_Y2 === "No");
        const refusedValue3 = data.filter((i) => i.imm_COVID_Y2 === "Refused");
        setTableResult(data);
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);
        setRefusedValue3(refusedValue3.length);
        console.log(yesValue3);
        console.log(noValue3);
        console.log(refusedValue3);

        data = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue3.length],
          ["No", noValue3.length],
          //   ["Refused", refusedValue3.length],
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
                      ["Yes", yesValue3],
                      ["No", noValue3],
                      //   ["Refused", refusedValue3],
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
                  {/* <span
                    onClick={() => tableDataClick("Refused")}
                    className="chart-lable refLable"
                  >
                    Refused
                  </span> */}
                </div>
              </div>
            </Card>
          </Col>

          <Col xxl={8} lg={8} xs={24}>
            <Card title="COVID VACCINE 2 DATA LIST" bordered={false}>
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
                    {/* <th>Refused</th> */}
                    {/* <th>{clickChartValue}</th> */}
                  </tr>

                  {tableResult.map((item) => (
                    <tr key={item.id}>
                      <td>{item.patientname}</td>
                      <td>
                        {item.imm_COVID_Y2 === "Yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                      <td>
                        {item.imm_COVID_Y2 === "No" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                      {/* <td>
                        {item.imm_COVID_Y2 === "Refused" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td> */}
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
export default DashboardCovid2;
