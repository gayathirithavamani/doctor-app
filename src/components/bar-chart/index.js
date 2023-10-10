import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ seriesData, xAxisValue, format, title }) => {
  const options = {
    chart: {
      type: "bar",
    },
    title: {
      //   text: "% OF DX CONDITION",
      text: title,
    },
    xAxis: {
      categories: xAxisValue,
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
          format: format,
        },
        pointWidth: 10,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },
    colors: ["#4f81c5"], // Set custom colors for the bars
    series: [
      {
        colorByPoint: true,
        data: seriesData,
      },
    ],
  };

  return (
    <div className="chart-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{
          style: { width: "550px", height: "300px", margin_bottom: "500px" },
        }}
      />
    </div>
  );
};

export default BarChart;
