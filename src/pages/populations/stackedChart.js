import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AddchartIcon from "@mui/icons-material/Addchart";

const HighchartsComponent = (props) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dementiaValue, setDementiaValue] = useState([]);
  const [stabilizedValue, setStabilizedValue] = useState([]);
  const [noChangeArr, setNoChangeValue] = useState();
  const [improvedArrArr, setImprovedArrValue] = useState();
  const [worsenedArrArr, setWorsenedArrValue] = useState();
  const [stabilizedArr, setStabilizedArrValue] = useState();
  const [zeroArr, setZeroArrValue] = useState();
  const [tableResult, setTableResult] = useState([]);
  const [showChart, setShowChart] = useState(true); // Add this state variable

  const tableContainerStyle = {
    width: "100%", // Set your desired width here
  };

  const tableStyle = {
    fontSize: "10px", // Set your desired font size here
  };

  const options = {
    chart: {
      type: "bar",
      width: 500, // Set the width here
      height: 400, // Set the height here
    },
    title: {
      text: "CONDITION CARE GAP",
    },
    xAxis: {
      categories: dementiaValue,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Goals",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px", // Set the font size to a smaller value
          },
        },
      },
    },
    series: [
      {
        name: " Stabilized",
        data: stabilizedArr,
      },
      {
        name: "Worsened",
        data: worsenedArrArr,
      },
      {
        name: "Improved",
        data: improvedArrArr,
      },
      {
        name: "NoChange",
        data: noChangeArr,
      },
      {
        name: "0",
        data: zeroArr,
      },
    ],
  };

  function splitCaregapsIntoBulletPoints(caregaps) {
    if (!caregaps) return []; // Return an empty array if there are no caregaps
    return caregaps.split(",").map((caregap) => caregap.trim());
  }

  // Function to toggle the visibility of the chart and table
  const toggleChartVisibility = () => {
    setShowChart((prevShowChart) => !prevShowChart);
  };

  useEffect(() => {
    // You can perform any necessary side effects here
    fetch("http://localhost:9090/findall")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        setTableResult(data);
        const caregap = [];
        // Loop through the retrieved data
        data.forEach((item, index) => {
          const bulletPoints = splitCaregapsIntoBulletPoints(item.caregaps);

          bulletPoints.forEach((point) => {
            console.log(`• ${point}`);
          });

          console.log(bulletPoints);
        });

        const diagnosListArray = data.map((item) => item.diagnos_LIST);
        let uniqueChars = [...new Set(diagnosListArray)];
        setDementiaValue(uniqueChars);
        const diagnosListArray1 = data.map(
          (item) => item.patient_CONDITION_DIAG_1
        );

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
              i.patient_CONDITION_DIAG_1 == "No change"
          );

          noChangeArr.push(noChangeValue.length);

          const imporvedValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 == "Improved"
          );

          improvedArr.push(imporvedValue.length);
          const worsenedValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 == "Worsened"
          );

          worsenedArr.push(worsenedValue.length);
          const stabilizedValue = data.filter(
            (i) =>
              i.diagnos_LIST === item &&
              i.patient_CONDITION_DIAG_1 == "Stabilized"
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* Chart */}

        <div style={{ display: "flex" }}>
          {/* Icon in the top left corner */}

          <HighchartsReact highcharts={Highcharts} options={options} />
          <link to="/">
            <div style={{ position: "relative", top: "10px", right: "30px" }}>
              <AddchartIcon />
            </div>
          </link>
        </div>

        {/* Table */}
        {props.tableView && (
          <div style={{ display: "flex" }}>
            <div style={tableContainerStyle}>
              <div style={{ overflowY: "auto", maxHeight: "400px" }}>
                <table style={tableStyle}>
                  <thead
                    style={{
                      position: "sticky",
                      top: "0",
                      backgroundColor: "darkblue",
                      color: "white",
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
                            {splitCaregapsIntoBulletPoints(item.caregaps).map(
                              (point, index) => (
                                <li key={index}>{point}</li>
                              )
                            )}
                          </ul>
                        </td>
                        <td>
                          {item.patient_CONDITION_DIAG_1 === "0" ? "✔️" : "❌"}
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
    </div>
  );
};

export default HighchartsComponent;
