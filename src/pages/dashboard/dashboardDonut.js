import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "../style/dashboard.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Row, Col, Card } from "antd";
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

  const [yesValueShow, setYesValueShow] = useState(true);
  const [noValueShow, setNoValueShow] = useState(true);
  const [refusedValueShow, setRefusedValueShow] = useState(true);

  // const tableDataClick = (clickValue) => {
  //   setClickChartValue(clickValue);
  //   setTableDataShow(true);
  //   const value = result.filter((i) => i.imm_FLU_Y === clickValue);
  //   setTableResult(value);
  // };

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
    fontSize: 10,
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

  return (
    <div>
      <h1>welcome to grid</h1>
      <Row gutter={28}>
        <>
          <Col xxl={6} lg={6} xs={12}>
            {/* <Card title="INFLUNZA" bordered={false}> */}
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
            {/* </Card> */}
          </Col>

          <div className="tableWrapper table-responsive ">
            <table className="smaller-table">
              {/* <tr>
                    <th>PATIENT NAME</th>
                    <th>{clickChartValue}</th>
                  </tr> */}
              <tr>
                <th>PATIENT NAME</th>
                {yesValueShow ? <th>Yes</th> : null}
                {noValueShow ? <th>No</th> : null}
                {refusedValueShow ? <th>Refused</th> : null}
                {/* <th>Yes</th>
                    <th>No</th>
                    <th>Refused</th> */}
                {/* <th>{clickChartValue}</th> */}
              </tr>

              {tableResult.map((item) => (
                <tr key={item.id}>
                  <td>{item.patientname}</td>
                  {yesValueShow ? (
                    <td>
                      {item.imm_FLU_Y === "Yes" ? <CheckIcon /> : <CloseIcon />}
                    </td>
                  ) : null}
                  {noValueShow ? (
                    <td>
                      {item.imm_FLU_Y === "No" ? <CheckIcon /> : <CloseIcon />}
                    </td>
                  ) : null}
                  {refusedValueShow ? (
                    <td>
                      {item.imm_FLU_Y === "Refused" ? (
                        <CheckIcon />
                      ) : (
                        <CloseIcon />
                      )}
                    </td>
                  ) : null}
                </tr>
              ))}
            </table>
          </div>

          {/* ) : null} */}
        </>
      </Row>
    </div>
  );
}
export default DashboardView;
