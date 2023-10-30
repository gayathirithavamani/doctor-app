import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

import "../style/dashboard.css";

import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Spin } from "antd";
let data2 = [
  ["Task", "Hours per Day"],
  ["Yes", 11],
  ["No", 2],
  ["Refused", 2],
];

const options1 = {
  title: "COVID BOOSTER",
  is3D: false,
  legend: {
    position: "right",
    maxLines: 1,
    textStyle: {
      color: "white",
    },
  },
  pieSliceText: "value",
  fontSize: 14,
  chartArea: { width: 250, height: 150 },
  pieHole: 0.25,
  pieStartAngle: 0,
  titleTextStyle: {
    fontSize: 16,
    color: "white",
  },
  animation: {
    startup: true,
    duration: 2000,
    easing: "out",
  },
  backgroundColor: "#222",
};

function DashboardBooster() {
  const [isLoading, setIsLoading] = useState(true);

  const [yesValue4, setYesValue4] = useState();
  const [noValue4, setNoValue4] = useState();
  const [refusedValue4, setRefusedValue4] = useState();
  const [blankValue, setBlankValue] = useState();
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
    if (clickValue === "Yes") {
      setYesValueShow(true);
      setRefusedValueShow(false);
      setNoValueShow(false);
    }
    if (clickValue === "No") {
      setYesValueShow(false);
      setRefusedValueShow(false);
      setNoValueShow(true);
    }
    if (clickValue === "Refused") {
      setYesValueShow(false);
      setRefusedValueShow(true);
      setNoValueShow(false);
    }
    if (clickValue === "data") {
      setYesValueShow(true);
      setRefusedValueShow(true);
      setNoValueShow(true);
    }
    if (clickValue === "data") {
      setTableResult(result);
    } else {
      const value = result.filter((i) => i.imm_COVID_Y3 === clickValue);
      setTableResult(value);
    }
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
        const blankValue = data.filter((i) => i.imm_COVID_Y3 === null);
        setBlankValue(blankValue.length);
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
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", display: "flex", height: "100vh" }}>
      {isLoading ? (
        <Spin
          size="large"
          style={{
            width: "30%",

            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <>
          <div
            className="chart-container"
            style={{ width: "30%", height: "100px" }}
          >
            <Chart
              chartType="PieChart"
              data={
                (data2 = [
                  ["Task", "Hours per Day"],
                  ["Yes", yesValue4],
                  ["No", noValue4],
                  ["Refused", refusedValue4],
                  ["(blank)", blankValue],
                ])
              }
              options={options1}
              width={"100%"}
              height={"400px"}
              margin-top={"30px"}
            />
            <PieChartIcon
              style={{
                position: "relative",
                right: "150px",
                top: "5px",
                color: "yellow",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            />
            <div
              className="lable-container"
              style={{ width: "5%", height: "100px" }}
            >
              <span
                onClick={() => tableDataClick("data")}
                className="chart-lable fullLable"
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

          <div
            style={{
              width: "65%",
              height: "50%",
              overflow: "auto",
              maxHeight: "400px",
            }}
          >
            <table className="custom-table">
              <thead
                style={{
                  position: "sticky",
                  top: "0",
                  background: "blue",
                  color: "black",
                  textAlign: "center",
                }}
              >
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
                      <td>{item.imm_COVID_Y3 === "Yes" ? "✔️" : "❌"}</td>
                    )}
                    {noValueShow && (
                      <td>{item.imm_COVID_Y3 === "No" ? "✔️" : "❌"}</td>
                    )}
                    {refusedValueShow && (
                      <td>{item.imm_COVID_Y3 === "Refused" ? "✔️" : "❌"}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
export default DashboardBooster;
