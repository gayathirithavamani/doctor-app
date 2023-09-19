import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

import "../style/dashboard.css";
import { Row, Col, Card } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DateRangeIcon from "@mui/icons-material/DateRange";

function DashboardView() {
  const [isLoading, setIsLoading] = useState(true);

  const [yesValue, setYesValue] = useState();
  const [noValue, setNoValue] = useState();
  const [refusedValue, setRefusedValue] = useState();

  const [tableDataShow, setTableDataShow] = useState(false);
  const [clickChartValue, setClickChartValue] = useState("");
  const [result, setResult] = useState([]);
  const [tableResult, setTableResult] = useState([]);

  const tableDataClick = (clickValue) => {
    setClickChartValue(clickValue);

    setTableDataShow(true);
    const value = result.filter((i) => i.imm_PNEUMO_Y === clickValue);
    setTableResult(value);
  };

  // const tableDataClick = (clickValue) => {
  //   setClickChartValue(clickValue);

  //   if (clickValue === "Add") {
  //     // Display all data
  //     setTableResult(result);
  //   } else {
  //     // Display data based on the selected value
  //     const value = result.filter((i) => i.imm_PNEUMO_Y === clickValue);
  //     setTableResult(value);
  //   }

  //   setTableDataShow(true);
  // };

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

    // console.log(data);
  }, []);

  const options = {
    title: null,
    is3D: true,
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
  let data = [
    ["Task", "Hours per Day"],
    ["Yes", 11],
    ["No", 2],
    ["Refused", 2],
  ];
  // function provideFeedback(choice) {

  //   var feedbackContainer = document.getElementsByClassName("symbol")
  //   var symbol = "";

  //   if (data.imm_PNEUMO_Y === "yes" || data.imm_PNEUMO_Y) {
  //     symbol = "&#10003;"; // Unicode tick symbol
  //   } else if (data.imm_PNEUMO_Y === "no") {
  //     symbol = "&#10060;"; // Unicode wrong symbol
  //   }

  //   feedbackContainer.innerHTML = symbol;
  // }

  return (
    <div>
      <h1>welcome to grid</h1>
      <Row gutter={28}>
        <>
          <Col xxl={12} lg={12} xs={24}>
            <Card title="PNEUMOCOCCAL" bordered={false}>
              <div className="chart-container">
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
            <Card title="PNEUMOCOCCAL DATA LIST" bordered={false}>
              <div className="tableWrapper table-responsive ">
                <table>
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
                        {item.imm_PNEUMO_Y === "Yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                      <td>
                        {item.imm_PNEUMO_Y === "No" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                      <td>
                        {item.imm_PNEUMO_Y === "Refused" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* 
                  {tableResult.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item.patientname}</td>

                        <td>
                          <CheckIcon />
                        </td>
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
export default DashboardView;
