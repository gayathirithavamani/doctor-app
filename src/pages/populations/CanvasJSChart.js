import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Spin } from "antd";
const customColors = [
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
  "#4f81c5",
];

function App() {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dementiaValue, setDementiaValue] = useState([]);
  const [diagnosisCounts, setDiagnosisCounts] = useState([]);
  const [percentagevalue, setPercentageValue] = useState([]); // Store diagnosis counts in an object

  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "PATIENT POPULATION BY DX",
    },
    xAxis: {
      categories: dementiaValue,
    },
    yAxis: {
      type: "category",
      tickInterval: 5,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointPadding: 0.4,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:1f}",
        },
        pointWidth: 10,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },
    colors: customColors, // Set custom colors for the bars
    series: [
      {
        colorByPoint: true,
        data: diagnosisCounts,
      },
    ],
  };

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
          y: ((item.y / totalPatients) * 100).toFixed(2),
        }));
        console.log(percentageData);
        setPercentageValue(percentageData);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
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
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { width: "800px", height: "600px" } }}
          />
        </>
      )}
    </div>
  );
}

export default App;
