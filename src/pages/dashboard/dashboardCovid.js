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

function DashboardCovid() {
  const [isLoading, setIsLoading] = useState(true);

  const [yesValue2, setYesValue2] = useState();
  const [noValue2, setNoValue2] = useState();
  const [refusedValue2, setRefusedValue2] = useState();
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
      const value = result.filter((i) => i.imm_COVID_Y === clickValue);
      setTableResult(value);
    }
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
        const blankValue = data.filter((i) => i.imm_COVID_Y === null);
        setBlankValue(blankValue.length);
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
            style={{ width: "20%", height: "100px", backgroundColor: "#222" }}
          >
            <Chart
              chartType="PieChart"
              data={
                (data2 = [
                  ["Task", "Hours per Day"],
                  ["Yes", yesValue2],
                  ["No", noValue2],
                  ["Refused", refusedValue2],
                  ["(blank)", blankValue],
                ])
              }
              options={options1}
              margin-top={"30px"}
            />

            <PieChartIcon
              style={{
                position: "relative",
                right: "50px",
                top: "5px",
                color: "yellow",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </div>

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
                      <td>{item.imm_COVID_Y === "Yes" ? "✔️" : "❌"}</td>
                    )}
                    {noValueShow && (
                      <td>{item.imm_COVID_Y === "No" ? "✔️" : "❌"}</td>
                    )}
                    {refusedValueShow && (
                      <td>{item.imm_COVID_Y === "Refused" ? "✔️" : "❌"}</td>
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
export default DashboardCovid;
