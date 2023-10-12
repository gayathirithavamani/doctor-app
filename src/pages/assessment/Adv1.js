import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "../style/dashboard.css";
import { Row, Col, Card } from "antd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";

function Adv1() {
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
      const value = result.filter((i) => i.adv_DIR1 === clickValue);
      setTableResult(value);
    }
  };

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        const yesValue = data.filter((i) => i.adv_DIR1 === "Yes");
        const noValue = data.filter((i) => i.adv_DIR1 === "No");

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
            <div className="chart-container" style={{ display: "flex" }}>
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
                width={"100%"}
                height={"400px"}
                margin-top={"30px"}
              />
              <Link to="/assessmentView">
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
              </div>
            </div>
            {/* </Card> */}
          </Col>

          <div className="tableWrapper table-responsive">
            <table className="smaller-table">
              <thead>
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
                        {item.adv_DIR1 === "Yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </td>
                    ) : null}
                    {noValueShow ? (
                      <td>
                        {item.adv_DIR1 === "No" ? <CheckIcon /> : <CloseIcon />}
                      </td>
                    ) : null}
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
export default Adv1;
