import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spin } from "antd";
import "../style/dashboard.css";
import { useNavigate } from "react-router-dom";
import TableRowsIcon from "@mui/icons-material/TableRows";

const HighchartsComponent = (props) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dementiaValue, setDementiaValue] = useState([]);

  const [noChangeArr, setNoChangeValue] = useState();
  const [improvedArrArr, setImprovedArrValue] = useState();
  const [worsenedArrArr, setWorsenedArrValue] = useState();
  const [stabilizedArr, setStabilizedArrValue] = useState();
  const [zeroArr, setZeroArrValue] = useState();
  const [tableResult, setTableResult] = useState([]);

  const tableContainerStyle = {
    width: "200%",
  };

  const tableStyle = {
    fontSize: "15px",
    fontFamily: "Calibri",
  };

  const options = {
    chart: {
      type: "bar",
      width: 500,
      height: 430,
      backgroundColor: "#222",
    },
    title: {
      text: "CONDITION CARE GAP",
      style: {
        color: "white",
        fontFamily: "Calibri",
        fontSize: "16px",
      },
    },
    xAxis: {
      categories: dementiaValue,
      labels: {
        style: {
          color: "white",
          fontFamily: "Calibri",
          fontSize: "14px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: "",
      labels: {
        style: {
          color: "white",
          fontFamily: "Calibri",
          fontSize: "14px",
        },
      },
    },
    legend: {
      reversed: true,
      itemStyle: {
        color: "white",
        fontFamily: "Calibri",
        fontSize: "14px",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          style: {
            color: "white",
            fontFamily: "Calibri",
            fontSize: "11px",
          },
        },
      },
    },
    series: [
      {
        name: " Stabilized",
        data: stabilizedArr,
        dataLabels: {
          enabled: true,
          style: {
            color: "white",
            fontFamily: "Calibri",
            fontSize: "12px",
          },
        },
      },
      {
        name: "Worsened",
        data: worsenedArrArr,
        dataLabels: {
          enabled: true,
          style: {
            color: "white",
            fontFamily: "Calibri",
            fontSize: "12px",
          },
        },
      },
      {
        name: "Improved",
        data: improvedArrArr,
        dataLabels: {
          enabled: true,
          style: {
            color: "white",
            fontFamily: "Calibri",
            fontSize: "12px",
          },
        },
      },
      {
        name: "NoChange",
        data: noChangeArr,
        nameLabels: {
          enabled: true,
          style: {
            color: "red",
            fontFamily: "Calibri",
            fontSize: "12px",
          },
        },
      },
      {
        name: "0",
        data: zeroArr,
        dataLabels: {
          enabled: true,
          style: {
            color: "white",
            fontFamily: "Calibri",
            fontSize: "12px",
          },
        },
      },
    ],
  };

  function splitCaregapsIntoBulletPoints(caregaps) {
    if (!caregaps) return [];
    return caregaps.split(",").map((caregap) => caregap.trim());
  }

  useEffect(() => {
    fetch("http://localhost:9090/findall")
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setTableResult(data);

        data.forEach((item, index) => {
          const bulletPoints = splitCaregapsIntoBulletPoints(item.caregaps);

          bulletPoints.forEach((point) => {});
        });

        const diagnosListArray = data.map((item) => item.diagnos_LIST);
        let uniqueChars = [...new Set(diagnosListArray)];
        setDementiaValue(uniqueChars);

        // const diagnosListArray1 = data.map(
        //   (item) => item.patient_CONDITION_DIAG_1
        // );

        // let uniqueChars1 = [...new Set(diagnosListArray1)];

        var noChangeArr = [];
        var improvedArr = [];
        var worsenedArr = [];
        var stabilizedArr = [];
        var zeroArr = [];
        uniqueChars.map((item) => {
          const zeroValue = data.filter(
            (i) => i.diagnos_LIST === item && i.patient_CONDITION_DIAG_1 == null
          );

          zeroArr.push(zeroValue.length);
          const noChangeValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 === "No change"
          );

          noChangeArr.push(noChangeValue.length);

          const imporvedValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 === "Improved"
          );

          improvedArr.push(imporvedValue.length);
          const worsenedValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 === "Worsened"
          );

          worsenedArr.push(worsenedValue.length);
          const stabilizedValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 === "Stabilized"
          );

          stabilizedArr.push(stabilizedValue.length);
        });
        setNoChangeValue(noChangeArr);
        setImprovedArrValue(improvedArr);
        setWorsenedArrValue(worsenedArr);
        setStabilizedArrValue(stabilizedArr);
        setZeroArrValue(zeroArr);

        setIsLoading(false);
      });
  }, []);
  const path = window.location.pathname;
  // console.log(path);

  const navigate = useNavigate();

  const handleNavigate = () => {
    const newPath =
      path === "/percentageView" ? "/stackedView" : "/percentageView";
    navigate(newPath);
  };

  return (
    <div style={{}}>
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
        // <Spin indicator={antIcon} />
        <>
          <div style={{ display: "flex" }}>
            {/* Chart */}

            <div className="outer " style={{ display: "flex" }}>
              <div className="chart-container">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
              <div style={{ position: "relative", top: "10px", right: "30px" }}>
                <TableRowsIcon
                  style={{ color: "yellow", cursor: "pointer" }}
                  onClick={handleNavigate}
                />
              </div>
            </div>

            {/* Table */}
            {props.tableView && (
              <div style={{ display: "flex" }}>
                <div style={tableContainerStyle}>
                  <div style={{ overflowY: "auto", maxHeight: "450px" }}>
                    <table style={tableStyle} className="custom-table">
                      <thead
                        className="table-heading"
                        // style={{
                        //   position: "sticky",
                        //   top: "0",
                        //   backgroundColor: "#222",
                        //   color: "#222",
                        //   textAlign: "center",
                        // }}
                      >
                        <tr>
                          <th>DX-List</th>
                          <th>Patient name</th>
                          <th>CareGapSn</th>
                          <th>0</th>
                          <th>Worsened</th>
                          <th>NoChange</th>
                          <th>Improved</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableResult.map((item) => (
                          <tr key={item.id}>
                            <td>{item.diagnos_LIST}</td>
                            <td>{item.patientname}</td>
                            <td>
                              <ul>
                                {/* Map bulletPoints for each item and display them as list items */}
                                {splitCaregapsIntoBulletPoints(
                                  item.caregaps
                                ).map((point, index) => (
                                  <li key={index}>{point}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              {item.patient_CONDITION_DIAG_1 === "0"
                                ? "✔️"
                                : "❌"}
                            </td>
                            <td>
                              {item.patient_CONDITION_DIAG_1 === "Worsened"
                                ? "✔️"
                                : "❌"}
                            </td>
                            <td>
                              {item.patient_CONDITION_DIAG_1 === "No change"
                                ? "✔️"
                                : "❌"}
                            </td>
                            <td>
                              {item.patient_CONDITION_DIAG_1 === "Improved"
                                ? "✔️"
                                : "❌"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HighchartsComponent;
