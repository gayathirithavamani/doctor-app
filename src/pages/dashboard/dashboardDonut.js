import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "../style/dashboard.css";
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
      const value = result.filter((i) => i.imm_FLU_Y === clickValue);
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
        const yesValue = data.filter((i) => i.imm_FLU_Y === "Yes");
        const noValue = data.filter((i) => i.imm_FLU_Y === "No");
        const refusedValue = data.filter((i) => i.imm_FLU_Y === "Refused");
        const blankValue = data.filter((i) => i.imm_FLU_Y === null);
        setBlankValue(blankValue.length);
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

    // console.log(data);
  }, []);

  const options = {
    title: "INFLUENZA",
    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "black",
      },
    },
    pieSliceText: "value",
    fontSize: 9,
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
              ["(blank)", blankValue],
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
            right: "150px",
            top: "5px",
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
                {yesValueShow ? (
                  <td>
                    {item.imm_FLU_Y === "Yes" ? (
                      <CheckIcon class="custom-check-icon" />
                    ) : (
                      <CloseIcon class="custom-check-icon" />
                    )}
                  </td>
                ) : null}
                {noValueShow ? (
                  <td>
                    {item.imm_FLU_Y === "No" ? (
                      <CheckIcon class="custom-check-icon" />
                    ) : (
                      <CloseIcon class="custom-check-icon" />
                    )}
                  </td>
                ) : null}
                {refusedValueShow ? (
                  <td>
                    {item.imm_FLU_Y === "Refused" ? (
                      <CheckIcon class="custom-check-icon" />
                    ) : (
                      <CloseIcon class="custom-check-icon" />
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DashboardView;
