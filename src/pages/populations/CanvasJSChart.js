import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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
  const [htnValue, setHtnValue] = useState();
  const [copdValue, setCOPDValue] = useState();
  const [DM2Value, setDM2Value] = useState();
  const [parkinsonsValue, setParkinsonsValue] = useState();
  const [CKDValue, setCKDValue] = useState();
  const [hyperlipidemiaValue, setHyperlipidemiaValue] = useState();
  const [schizophreniaValue, setSchizophreniaValue] = useState();
  const [hyperthyroidismValue, setHyperthyroidismValue] = useState();
  const [depressionValue, setDepressionValue] = useState();
  const [chfValue, setChfValue] = useState();
  const [asthmaValue, setAasthmaValue] = useState();
  const [seizureValue, setSeizureValue] = useState();
  const [dementiaValue, setDementiaValue] = useState();

  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "PATIENT POPULATION BY DX",
    },
    xAxis: {
      categories: [
        "HTN",
        "COPD",
        "DM-2",
        "Parkinson's Disease",
        "CKD",
        "Hyperlipidemia",
        "Schizophrenia",
        "Hyperthyroidism",
        "Depression",
        "CHF",
        "Asthma",
        "Seizure Disorder",
        "dementia",
      ],
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
        data: [
          { name: "HTN", y: htnValue },
          { name: "COPD", y: copdValue },
          { name: "DM-2", y: DM2Value },
          { name: "Parkinson's Disease", y: parkinsonsValue },
          { name: "CKD", y: CKDValue },
          { name: "Hyperlipidemia", y: hyperlipidemiaValue },
          { name: "Schizophrenia", y: schizophreniaValue },
          { name: "Hyperthyroidism", y: hyperthyroidismValue },
          { name: "Depression", y: depressionValue },
          { name: "CHF", y: chfValue },
          { name: "Asthma", y: asthmaValue },
          { name: "Seizure Disorder", y: seizureValue },
          { name: "dementia", y: dementiaValue },
        ],
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
        // const data={name:"",y:""}
        // const y-axisValues = data.filter((i) => .filter((i) => i.diagnos_name && i.diagnos_LIST)
  // .map((i) => ({ name: i.diagnos_name, y: i.diagnos_LIST })));

        const htnValue = data.filter((i) => i.diagnos_LIST === "Hypertension");
        const copdValue = data.filter((i) => i.diagnos_LIST === "COPD");
        const DM2Value = data.filter(
          (i) => i.diagnos_LIST === "Diabetes Mellitus Type II"
        );
        const parkinsonsValue = data.filter(
          (i) => i.diagnos_LIST === "Parkinson’s Disease"
        );
        const CKDValue = data.filter((i) => i.diagnos_LIST === "CKD");
        const hyperlipidemiaValue = data.filter(
          (i) => i.diagnos_LIST === "Hyperlipidemia"
        );
        const schizophreniaValue = data.filter(
          (i) => i.diagnos_LIST === "Schizophrenia"
        );
        const hyperthyroidismValue = data.filter(
          (i) => i.diagnos_LIST === "Hypothyroidism"
        );
        const chfValue = data.filter(
          (i) => i.diagnos_LIST === "Congestive Heart Failure"
        );
        const asthmaValue = data.filter((i) => i.diagnos_LIST === "Asthma");
        const seizureValue = data.filter(
          (i) => i.diagnos_LIST === "Seizure Disorder"
        );
        const dementiaValue = data.filter((i) => i.diagnos_LIST === "Dementia");
        const depressionValue = data.filter(
          (i) => i.diagnos_LIST === "Depression"
        );

        // const diagnosListArray = data.map((item) => item.diagnos_LIST);

        // console.log(diagnosListArray);
        // let uniqueChars = [...new Set(diagnosListArray)];

        // console.log(uniqueChars);

        function extractUniqueDiagnosValues(data, item) {
          const diagnosListArray = data.map((item) => item.diagnos_LIST);
          const uniqueChars = [...new Set(diagnosListArray)];
          const filter = uniqueChars.filter((i) => i.diagnos_LIST === item);

          return filter;
        }

        extractUniqueDiagnosValues(data);
        const uniqueDiagnosValues = extractUniqueDiagnosValues(data);
        // console.log(uniqueDiagnosValues);

        // const obj = { ...extractUniqueDiagnosValues };
        // console.log(obj)

        const arrayOfObjects = uniqueDiagnosValues.map((value) => {
          return { value: value };
        });
        console.log(arrayOfObjects);

        setHtnValue(htnValue.length);
        setCOPDValue(copdValue.length);
        setDM2Value(DM2Value.length);
        setParkinsonsValue(parkinsonsValue.length);
        setCKDValue(CKDValue.length);
        setHyperlipidemiaValue(hyperlipidemiaValue.length);
        setSchizophreniaValue(schizophreniaValue.length);
        setHyperthyroidismValue(hyperthyroidismValue.length);
        setDepressionValue(depressionValue.length);
        setChfValue(chfValue.length);
        setAasthmaValue(asthmaValue.length);
        setSeizureValue(seizureValue.length);
        setDementiaValue(dementiaValue.length);

        console.log(htnValue.length);
        console.log(copdValue.length);
        console.log(DM2Value.length);
        console.log(parkinsonsValue.length);
        console.log(CKDValue.length);
        console.log(schizophreniaValue.length);
        console.log(hyperthyroidismValue.length);
        console.log(depressionValue.length);

        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { width: "800px", height: "600px" } }}
      />
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const customColors = [
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
//   "#4f81c5",
// ];

// function App() {
//   const [result, setResult] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [diagnosisCounts, setDiagnosisCounts] = useState({}); // Store diagnosis counts in an object

//   const options = {
//     chart: {
//       type: "bar",
//     },
//     title: {
//       text: "PATIENT POPULATION BY DX",
//     },
//     xAxis: {
//       categories: [
//         "HTN",
//         "COPD",
//         "DM-2",
//         "Parkinson's Disease",
//         "CKD",
//         "Hyperlipidemia",
//         "Schizophrenia",
//         "Hyperthyroidism",
//         "Depression",
//         "CHF",
//         "Asthma",
//         "Seizure Disorder",
//         "dementia",
//       ],
//     },
//     yAxis: {
//       type: "category",
//       tickInterval: 5,
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       series: {
//         pointPadding: 0.4,
//         borderWidth: 0,
//         dataLabels: {
//           enabled: true,
//           format: "{point.y:1f}",
//         },
//         pointWidth: 10,
//       },
//     },
//     tooltip: {
//       headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//       pointFormat:
//         '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
//     },
//     colors: customColors, // Set custom colors for the bars
//     series: [
//       {
//         colorByPoint: true,
//         data: Object.keys(diagnosisCounts).map((diagnosis) => ({
//           name: diagnosis,
//           y: diagnosisCounts[diagnosis],
//         })),
//       },
//     ],
//   };

//   useEffect(() => {
//     // You can perform any necessary side effects here
//     fetch("http://localhost:9090/findall")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setResult(data);

//         // Calculate diagnosis counts and store them in the object
//         const counts = {};
//         data.forEach((item) => {
//           if (!counts[item.diagnos_LIST]) {
//             counts[item.diagnos_LIST] = 0;
//           }
//           counts[item.diagnos_LIST]++;
//         });
//         setDiagnosisCounts(counts);

//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <HighchartsReact
//         highcharts={Highcharts}
//         options={options}
//         containerProps={{ style: { width: "800px", height: "600px" } }}
//       />
//     </div>
//   );
// }

// export default App;
