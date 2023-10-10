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
  const [yesValueShow, setYesValueShow] = useState(true);
  const [noValueShow, setNoValueShow] = useState(true);
  const [refusedValueShow, setRefusedValueShow] = useState(true);

  const tableDataClick = (clickValue) => {
    setClickChartValue(clickValue);

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

    if (clickValue == "data") {
      setYesValueShow(true);
      setRefusedValueShow(true);
      setNoValueShow(true);
    }
    if (clickValue == "data") {
      setTableResult(result);
    } else {
      const value = result.filter((i) => i.imm_COVID_Y2 === clickValue);
      setTableResult(value);
    }
  };
  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue3 = data.filter((i) => i.imm_COVID_Y2 === "Yes");
        const noValue3 = data.filter((i) => i.imm_COVID_Y2 === "No");

        setTableResult(data);
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);

        console.log(yesValue3);
        console.log(noValue3);

        data = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue3.length],
          ["No", noValue3.length],
        ];
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>welcome to grid</h1>
      <Row gutter={28}>
        <>
          <Col xxl={6} lg={6} xs={12}>
            <div className="chart-container">
              <Chart
                chartType="PieChart"
                data={
                  (data2 = [
                    ["Task", "Hours per Day"],
                    ["Yes", yesValue3],
                    ["No", noValue3],
                  ])
                }
                options={options1}
                width={"100%"}
                height={"400px"}
                margin-top={"30px"}
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
              </div>
            </div>
          </Col>

          <div className="tableWrapper table-responsive ">
            <table className="smaller-table">
              <thead>
                <tr>
                  <th>PATIENT NAME</th>
                  {yesValueShow ? <th>Yes</th> : null}
                  {noValueShow ? <th>No</th> : null}
                </tr>
              </thead>
              <tbody>
                {tableResult.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patientname}</td>
                    {yesValueShow && (
                      <td>
                        {item.imm_COVID_Y2 === "Yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    ) }
                    {noValueShow && (
                      <td>
                        {item.imm_COVID_Y2 === "No" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    ) }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
        </>
      </Row>
    </div>
  );
}
export default DashboardCovid2;
