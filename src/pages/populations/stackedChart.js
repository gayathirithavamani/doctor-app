import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spin } from "antd";

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
  const [showChart, setShowChart] = useState(true);

  const tableContainerStyle = {
    width: "200%",
  };

  const tableStyle = {
    fontSize: "10px",
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
      },
    },
    xAxis: {
      categories: dementiaValue,
      labels: {
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      min: 0,
      title: "",
      labels: {
        style: {
          color: "white",
        },
      },
    },

    legend: {
      reversed: true,
      itemStyle: {
        color: "white",
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "11px",
            color: "white",
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
          },
        },
      },
    ],
  };

  function splitCaregapsIntoBulletPoints(caregaps) {
    if (!caregaps) return [];
    return caregaps.split(",").map((caregap) => caregap.trim());
  }

  // Function to toggle the visibility of the chart and table
  // const toggleChartVisibility = () => {
  //   setShowChart((prevShowChart) => !prevShowChart);
  // };

  useEffect(() => {
    fetch("http://localhost:9090/findall")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setResult(data);
        setTableResult(data);
        //  const caregap = [];

        data.forEach((item, index) => {
          const bulletPoints = splitCaregapsIntoBulletPoints(item.caregaps);

          bulletPoints.forEach((point) => {
            // console.log(`• ${point}`);
          });

          // console.log(bulletPoints);
        });

        const diagnosListArray = data.map((item) => item.diagnos_LIST);
        let uniqueChars = [...new Set(diagnosListArray)];
        setDementiaValue(uniqueChars);

        const diagnosListArray1 = data.map(
          (item) => item.patient_CONDITION_DIAG_1
        );
        // console.log(diagnosListArray + "hii");

        let uniqueChars1 = [...new Set(diagnosListArray1)];

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

  // Your component code

  const handleNavigate = () => {
    const newPath =
      path === "/percentageView" ? "/stackedView" : "/percentageView";
    navigate(newPath);
  };

  return (
    <div>
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

              {/* <Link
            to={path === "/percentageView" ? "/stackedView" : "/percentageView"}
          >
            <div style={{ position: "relative", top: "10px", right: "30px" }}>
              <AddchartIcon />
            </div>
          </Link> */}
            </div>

            {/* Table */}
            {props.tableView && (
              <div style={{ display: "flex" }}>
                <div style={tableContainerStyle}>
                  <div style={{ overflowY: "auto", maxHeight: "400px" }}>
                    <table style={tableStyle} className="custom-table">
                      <thead
                        style={{
                          position: "sticky",
                          top: "0",
                          backgroundColor: "darkblue",
                          color: "#222",
                          textAlign: "center",
                        }}
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
