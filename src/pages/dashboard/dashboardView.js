import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "../style/dashboard.css";
import { Row, Col, Card } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link, useNavigate } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";

function DashboardView() {
  const [isLoading, setIsLoading] = useState(true);
  const [yesValue, setYesValue] = useState();

  const [noValue, setNoValue] = useState();
  const [refusedValue, setRefusedValue] = useState();
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
      const value = result.filter((i) => i.imm_PNEUMO_Y === clickValue);
      setTableResult(value);
    }
  };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue = data.filter((i) => i.imm_PNEUMO_Y === "Yes");
        const noValue = data.filter((i) => i.imm_PNEUMO_Y === "No");
        const refusedValue = data.filter((i) => i.imm_PNEUMO_Y === "Refused");
        setTableResult(data);
        setYesValue(yesValue.length);
        setNoValue(noValue.length);
        setRefusedValue(refusedValue.length);
        console.log(yesValue);
        console.log(noValue);
        console.log(refusedValue);

        data = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue.length],
          ["No", noValue.length],
          ["Refused", refusedValue.length],
        ];
        setIsLoading(false);
      });
  }, []);

  // const options = {
  //   title: null,
  //   is3D: true,
  //   legend: { position: "bottom", alignment: "center" },
  //   pieSliceText: "value",
  //   fontSize: 9,
  //   chartArea: { width: 250, height: 150 },
  //   pieHole: 0.25,
  //   pieStartAngle: 0,
  //   animation: {
  //     startup: true,
  //     duration: 2000,
  //     easing: "out",
  //   },
  // };

  const options = {
    title: "PNEUMOC0CCAL",

    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 9,
    chartArea: { width: 250, height: 150 },
    pieHole: 0.2,
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
    backgroundColor: "#222", // Replace "your-color-here" with the desired background color
  };
  let data = [
    ["Task", "Hours per Day"],
    ["Yes", 11],
    ["No", 2],
    ["Refused", 2],
  ];
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", display: "flex", height: "100%" }}>
      <div
        className="chart-container"
        style={{ width: "30%", height: "100px" }}
      >
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
          margin-top={"30px"}
        />

        <PieChartIcon
          style={{
            position: "relative",
            right: "45px",
            top: "17px",
            color: "yellow",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/dashboard");
          }}
        />
      </div>
      <div className="lable-container" style={{ width: "5%", height: "100px" }}>
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
      <div style={{ width: "65%", height: "50%", overflow: "scroll" }}>
        {/* <table>
          <tr>
            <th>PATIENT NAME</th>
            {yesValueShow && <th>Yes</th>}
            {noValueShow && <th>No</th>}
            {refusedValueShow && <th>Refused</th>}
          </tr>

          {tableResult.map((item) => (
            <tr key={item.id}>
              <td>{item.patientname}</td>
              {yesValueShow && (
                <td>
                  {item.imm_PNEUMO_Y === "Yes" ? <CheckIcon /> : <CloseIcon />}
                </td>
              )}
              {noValueShow && (
                <td>
                  {item.imm_PNEUMO_Y === "No" ? <CheckIcon /> : <CloseIcon />}
                </td>
              )}
              {refusedValueShow && (
                <td>
                  {item.imm_PNEUMO_Y === "Refused" ? (
                    <CheckIcon />
                  ) : (
                    <CloseIcon />
                  )}
                </td>
              )}
            </tr>
          ))}
        </table> */}
        <table className="custom-table">
          <thead>
            <tr>
              <th>PATIENT NAME</th>
              {yesValueShow && <th>Yes</th>}
              {noValueShow && <th>No</th>}
              {refusedValueShow && <th>Refused</th>}
            </tr>
          </thead>
          <tbody>
            {tableResult.map((item) => (
              <tr key={item.id}>
                <td>{item.patientname}</td>
                {yesValueShow && (
                  <td>
                    {item.imm_PNEUMO_Y === "Yes" ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </td>
                )}
                {noValueShow && (
                  <td>
                    {item.imm_PNEUMO_Y === "No" ? <CheckIcon /> : <CloseIcon />}
                  </td>
                )}
                {refusedValueShow && (
                  <td>
                    {item.imm_PNEUMO_Y === "Refused" ? (
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
    </div>
  );
}
export default DashboardView;
