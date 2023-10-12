import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "../style/dashboard.css";
import { Row, Col, Card } from "antd";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";
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

  const [yesValueShow, setYesValueShow] = useState(true);
  const [noValueShow, setNoValueShow] = useState(true);
  const [refusedValueShow, setRefusedValueShow] = useState(true);

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
      const value = result.filter((i) => i.imm_COVID_Y3 === clickValue);
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
          <Col xxl={6} lg={6} xs={12}>
            <div className="chart-container" style={{ display: "flex" }}>
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
                margin-top={"30px"}
              />
              <Link to="/dashboard">
                <PieChartIcon
                  style={{ position: "relative", right: "45px", top: "17px" }}
                />
              </Link>
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
          </Col>

          <div className="tableWrapper table-responsive ">
            <table>
              <thead>
                <tr>
                  <th>PATIENT NAME</th>
                  {yesValueShow ? <th>Yes</th> : null}
                  {noValueShow ? <th>No</th> : null}
                  {refusedValueShow ? <th>Refused</th> : null}
                </tr>
              </thead>
              <tbody>
                {tableResult.map((item) => (
                  <tr key={item.id}>
                    <td>{item.patientname}</td>
                    {yesValueShow && (
                      <td>
                        {item.imm_COVID_Y3 === "Yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    )}
                    {noValueShow && (
                      <td>
                        {item.imm_COVID_Y3 === "No" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    )}
                    {refusedValueShow && (
                      <td>
                        {item.imm_COVID_Y3 === "Refused" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ) : null} */}
        </>
      </Row>
    </div>
  );
}
export default DashboardBooster;
