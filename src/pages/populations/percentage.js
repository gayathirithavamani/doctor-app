import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import BarChart from "../../components/bar-chart";
import HighchartsComponent from "./stackedChart";

const customColors = ["#4f81c5"];

function Percentage() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dementiaValue, setDementiaValue] = useState([]);
  const [diagnosisCounts, setDiagnosisCounts] = useState([]);
  const [percentagevalue, setPercentageValue] = useState([]); // Store diagnosis counts in an object

  useEffect(() => {
    // You can perform any necessary side effects here
    fetch("http://localhost:9090/findall")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);

        var listArray = [];
        data.map((item) => {
          const existingItemIndex = listArray.findIndex(
            (i) => i.name === item.diagnos_LIST
          );
          console.log(existingItemIndex);

          if (existingItemIndex === -1) {
            listArray.push({
              name: item.diagnos_LIST,
              y: data.filter((i) => i.diagnos_LIST === item.diagnos_LIST)
                .length,
            });
          }
        });

        console.log(listArray);
        setDiagnosisCounts(listArray);

        const diagnosListArray = data.map((item) => item.diagnos_LIST);
        let uniqueChars = [...new Set(diagnosListArray)];
        setDementiaValue(uniqueChars);
        console.log(uniqueChars);

        const totalPatients = data.length; // Calculate total patients
        console.log(`Total number of patients: ${totalPatients}`);
        // console.log(diagnosisCounts);

        const percentageData = listArray.map((item) => ({
          name: item.name,
          y: Number(((item.y / totalPatients) * 100).toFixed(2)),
        }));

        console.log(percentageData);
        setPercentageValue(percentageData);
        setIsLoading(false);
      });

      // result.find((item) => item.id === selectedId)
  }, []);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "50%" }}>
        <div style={{marginBottom:"20px"}}>
          <BarChart
            seriesData={diagnosisCounts}
            xAxisValue={dementiaValue}
            format={"{point.y:1f}"}
            title={"PATIENT POPULATION BY DX"}
          />
        </div>
        <div>
          <BarChart
            seriesData={percentagevalue}
            xAxisValue={dementiaValue}
            format={"{point.y:1f}%"}
            title={"% OF DX CONDITION"}
          />
        </div>
      </div>
      <div style={{ width: "50%", height: "100%" }}>
     <HighchartsComponent tableView={false}/>
      </div>
    </div>
  );
}

export default Percentage;
