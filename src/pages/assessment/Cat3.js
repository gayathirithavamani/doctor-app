import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "../style/dashboard.css";
import { Row, Col, Card } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";

function Cat3() {
  const [isLoading, setIsLoading] = useState(true);
  const [yesValue, setYesValue] = useState();

  const [noValue, setNoValue] = useState();

  const [tableDataShow, setTableDataShow] = useState(false);
  const [clickChartValue, setClickChartValue] = useState("");
  const [result, setResult] = useState([]);
  const [tableResult, setTableResult] = useState([]);
  const [yesValueShow, setYesValueShow] = useState(true);
  const [noValueShow, setNoValueShow] = useState(true);

  const tableDataClick = (clickValue) => {
    setClickChartValue(clickValue);

    setTableDataShow(true);

    if (clickValue == "Yes") {
      setYesValueShow(true);

      setNoValueShow(false);
    }
    if (clickValue == "No") {
      setYesValueShow(false);

      setNoValueShow(true);
    }

    if (clickValue == "data") {
      setYesValueShow(true);

      setNoValueShow(true);
    }
    if (clickValue == "data") {
      setTableResult(result);
    } else {
      const value = result.filter((i) => i.cat4 === clickValue);
      setTableResult(value);
    }
  };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue = data.filter((i) => i.cat4 === "Yes");
        const noValue = data.filter((i) => i.cat4 === "No");

        setTableResult(data);
        setYesValue(yesValue.length);
        setNoValue(noValue.length);

        console.log(yesValue);
        console.log(noValue);

        data = [
          ["Task", "Hours per Day"],
          ["Yes", yesValue.length],
          ["No", noValue.length],
        ];
        setIsLoading(false);
      });
  }, []);

  const options = {
    title: "CATHETER CARE PLAN",
    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 10,
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
            ])
          }
          options={options}
          // width={"100%"}
          // height={"400px"}
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
            navigate("/assessmentView");
          }}
        />
      </div>

      <div className="lable-container">
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
              {yesValueShow && <th>Yes</th>}
              {noValueShow && <th>No</th>}
            </tr>
          </thead>
          <tbody>
            {tableResult.map((item) => (
              <tr key={item.id}>
                <td>{item.patientname}</td>
                {yesValueShow ? (
                  <td>
                    {item.cat4 === "Yes" ? (
                      <CheckIcon class="custom-check-icon" />
                    ) : (
                      <CloseIcon class="custom-check-icon" />
                    )}
                  </td>
                ) : null}
                {noValueShow ? (
                  <td>
                    {item.cat4 === "No" ? (
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
export default Cat3;
