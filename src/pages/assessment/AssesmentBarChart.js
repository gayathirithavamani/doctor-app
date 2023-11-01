import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import "../style/dashboardView.css";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppsIcon from "@mui/icons-material/Apps";
import GradingIcon from "@mui/icons-material/Grading";
import { Spin } from "antd";

const AssessmentBarView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [yesValue, setYesValue] = useState();
  const [noValue, setNoValue] = useState();
  const [yesValue1, setYesValue1] = useState();
  const [noValue1, setNoValue1] = useState();
  const [yesValue2, setYesValue2] = useState();
  const [noValue2, setNoValue2] = useState();
  const [yesValue3, setYesValue3] = useState();
  const [noValue3, setNoValue3] = useState();
  const [yesValue4, setYesValue4] = useState();
  const [noValue4, setNoValue4] = useState();
  const [yesValue5, setYesValue5] = useState();
  const [noValue5, setNoValue5] = useState();
  const [yesValue6, setYesValue6] = useState();
  const [noValue6, setNoValue6] = useState();
  const [yesValue7, setYesValue7] = useState();
  const [noValue7, setNoValue7] = useState();
  const [yesValue8, setYesValue8] = useState();
  const [noValue8, setNoValue8] = useState();
  const [yesValue9, setYesValue9] = useState();
  const [noValue9, setNoValue9] = useState();
  const [yesValue10, setYesValue10] = useState();
  const [noValue10, setNoValue10] = useState();
  const [nValue10, setNValue10] = useState();
  const [yesValue11, setYesValue11] = useState();
  const [noValue11, setNoValue11] = useState();
  const [skinValue1, setSkinValue1] = useState();
  const [skinValue2, setSkinValue2] = useState();
  const [skinValue3, setSkinValue3] = useState();
  const [skinValue4, setSkinValue4] = useState();
  const [single, setSingle] = useState();
  const [values, setValues] = useState([]);
  const [suprapublic, setSuprapublic] = useState();
  const [foley, setFoley] = useState();
  const [selectedNames, setSelectedNames] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectYes, setSelectYes] = useState();
  const [selectNo, setSelectNo] = useState();

  const [selectYes1, setSelectYes1] = useState();
  const [selectNo1, setSelectNo1] = useState();

  const [selectYes2, setSelectYes2] = useState();
  const [selectNo2, setSelectNo2] = useState();

  const [selectYes3, setSelectYes3] = useState();
  const [selectNo3, setSelectNo3] = useState();

  const [selectYes4, setSelectYes4] = useState();
  const [selectNo4, setSelectNo4] = useState();

  const [selectYes5, setSelectYes5] = useState();
  const [selectNo5, setSelectNo5] = useState();

  const [selectYes6, setSelectYes6] = useState();
  const [selectNo6, setSelectNo6] = useState();

  const [selectYes7, setSelectYes7] = useState();
  const [selectNo7, setSelectNo7] = useState();

  const [selectYes8, setSelectYes8] = useState();
  const [selectNo8, setSelectNo8] = useState();

  const [selectYes9, setSelectYes9] = useState();
  const [selectNo9, setSelectNo9] = useState();

  const [selectYes10, setSelectYes10] = useState();
  const [selectNo10, setSelectNo10] = useState();
  const [selectNValue10, setSelectNValue10] = useState();

  const [selectYes11, setSelectYes11] = useState();
  const [selectNo11, setSelectNo11] = useState();

  const [selectSkinValue1, setSelectSkinValue1] = useState();
  const [selectSkinValue2, setSelectSkinValue2] = useState();
  const [selectSkinValue3, setSelectSkinValue3] = useState();
  const [selectSkinValue4, setSelectSkinValue4] = useState();

  const [selectSuprapublicValue, setSelectSuprapublicValue] = useState();
  const [selectFoleyValue, setSelectFoleyValue] = useState();
  const [multibuttonStates, setMultiButtonStates] = useState(
    values.map(() => false)
  );

  const [buttonStates, setButtonStates] = useState();

  const chartName = [
    {
      id: 1,
      name: "ADVANCED DIRECTIVE(S)",
    },
    {
      id: 2,
      name: "ADVANCED DIRECTIVE(S) TYPES",
    },
    {
      id: 3,
      name: "ADV CARE PLAN",
      path: "/adv1",
    },
    {
      id: 4,
      name: "ADV DOCTORS ORDERS",
      path: "/adv2",
    },
  ];
  const chartName1 = [
    {
      id: 5,
      name: "CATHETER",
      path: "/cat1",
    },
    {
      id: 6,
      name: "CATHETER TYPES",
      path: "/cat2",
    },
    {
      id: 7,
      name: "CATHETER CARE PLAN",
      path: "/cat3",
    },
    {
      id: 8,
      name: "CATHETER INDICATION",
      path: "/cat4",
    },
  ];
  const chartName2 = [
    {
      id: 9,
      name: "FALL RISK ASSESSMENT",
      path: "/fall1",
    },
    {
      id: 10,
      name: "FALL RISK CARE PLAN",
      path: "/fall2",
    },
  ];
  const chartName3 = [
    { id: 11, name: "SKIN RISK ASSESSMENT", path: "/skin1" },
    {
      id: 12,
      name: "SKIN RISK CATEGORY",
    },
    {
      id: 13,
      name: "SKIN RISK SCORE",
    },
    {
      id: 14,
      name: "SKIN RISK CARE PLAN",
      path: "/skin4",
    },
  ];

  const chartOptions = chartName.map((item) => ({
    title: item.name,
    path: item.path,
    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 11,
    chartArea: { width: 250, height: 150 },
    pieHole: 0.2,
    pieStartAngle: 0,
    titleTextStyle: {
      fontSize: 16,
      color: "white",
    },
    animation: {
      startup: true,
      duration: 2000,
      easing: "out",
    },
  }));
  const chartOptions1 = chartName1.map((item) => ({
    title: item.name,
    path: item.path,
    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 11,
    chartArea: { width: 250, height: 150 },
    pieHole: 0.2,
    pieStartAngle: 0,
    titleTextStyle: {
      fontSize: 16,
      color: "white",
    },
    animation: {
      startup: true,
      duration: 2000,
      easing: "out",
    },
  }));
  const chartOptions2 = chartName2.map((item) => ({
    title: item.name,
    path: item.path,
    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 11,
    chartArea: { width: 250, height: 150 },
    pieHole: 0.2,
    pieStartAngle: 0,
    titleTextStyle: {
      fontSize: 16,
      color: "white",
    },
    animation: {
      startup: true,
      duration: 2000,
      easing: "out",
    },
  }));
  const chartOptions3 = chartName3.map((item) => ({
    title: item.name,
    path: item.path,
    is3D: true,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 11,
    chartArea: { width: 250, height: 150 },
    pieHole: 0.2,
    pieStartAngle: 0,
    titleTextStyle: {
      fontSize: 16,
      color: "white",
    },
    animation: {
      startup: true,
      duration: 2000,
      easing: "out",
    },
  }));

  useEffect(() => {
    fetch("http://localhost:9090/findall ")
      .then((response) => response.json())
      .then((data) => {
        setValues(data);

        const yesValue = data.filter((i) => i.adv_DIR1 === "Yes");
        const noValue = data.filter((i) => i.adv_DIR1 === "No");
        setYesValue(yesValue.length);
        setNoValue(noValue.length);
        const yesValue1 = data.filter((i) => i.adv_DIR3 === "Full Code");
        const noValue1 = data.filter((i) => i.adv_DIR3 === "DNR");
        setYesValue1(yesValue1.length);
        setNoValue1(noValue1.length);

        const yesValue2 = data.filter((i) => i.adv_DIR5 === "Yes");
        const noValue2 = data.filter((i) => i.adv_DIR5 === "No");
        setYesValue2(yesValue2.length);
        setNoValue2(noValue2.length);
        const yesValue3 = data.filter((i) => i.adv_DIR4 === "Yes");
        const noValue3 = data.filter((i) => i.adv_DIR4 === "No");
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);
        const yesValue4 = data.filter((i) => i.cat1 === "Yes");
        const noValue4 = data.filter((i) => i.cat1 === "No");
        setYesValue4(yesValue4.length);
        setNoValue4(noValue4.length);
        const yesValue5 = data.filter((i) => i.cat4 === "Yes");
        const noValue5 = data.filter((i) => i.cat4 === "No");
        setYesValue5(yesValue5.length);
        setNoValue5(noValue5.length);
        const yesValue6 = data.filter((i) => i.cat5 === "Yes");
        const noValue6 = data.filter((i) => i.cat5 === "No");
        setYesValue6(yesValue6.length);
        setNoValue6(noValue6.length);
        const yesValue7 = data.filter((i) => i.fall_RISK_1 === "Yes");
        const noValue7 = data.filter((i) => i.fall_RISK_1 === "No");
        setYesValue7(yesValue7.length);
        setNoValue7(noValue7.length);
        const yesValue8 = data.filter((i) => i.fall_RISK_2 === "Yes");
        const noValue8 = data.filter((i) => i.fall_RISK_2 === "No");
        setYesValue8(yesValue8.length);
        setNoValue8(noValue8.length);
        const yesValue9 = data.filter((i) => i.skin_RISK_1 === "Yes");
        const noValue9 = data.filter((i) => i.skin_RISK_1 === "No");
        setYesValue9(yesValue9.length);
        setNoValue9(noValue9.length);
        const yesValue10 = data.filter((i) => i.skin_RISK_2 === "Braden");
        const noValue10 = data.filter((i) => i.skin_RISK_2 === "n/a");
        const nValue10 = data.filter((i) => i.skin_RISK_2 === null);
        setYesValue10(yesValue10.length);
        setNoValue10(noValue10.length);
        setNValue10(nValue10.length);
        const yesValue11 = data.filter((i) => i.skin_RISK_5 === "Yes");
        const noValue11 = data.filter((i) => i.skin_RISK_5 === "No");
        setYesValue11(yesValue11.length);
        setNoValue11(noValue11.length);

        const skinValue1 = data.filter((i) => i.skin_RISK_3 === "n/a");
        const skinValue2 = data.filter(
          (i) => i.skin_RISK_3 === "Very High Risk"
        );
        const skinValue3 = data.filter((i) => i.skin_RISK_3 === "At Risk");
        const skinValue4 = data.filter(
          (i) => i.skin_RISK_3 === "Moderate Risk"
        );
        setSkinValue1(skinValue1.length);
        setSkinValue2(skinValue2.length);
        setSkinValue3(skinValue3.length);
        setSkinValue4(skinValue4.length);
        const suprapublic = data.filter((i) => i.cat2 === "Suprapublic");
        const foley = data.filter((i) => i.cat2 === "Foley");
        setSuprapublic(suprapublic.length);
        setFoley(foley.length);

        const selectYes = selectedNames.filter((i) => i.adv_DIR1 === "Yes");
        setSelectYes(selectYes.length);
        const selectNo = selectedNames.filter((i) => i.adv_DIR1 === "No");
        setSelectNo(selectNo.length);
        const selectYes1 = selectedNames.filter(
          (i) => i.adv_DIR3 === "Full Code"
        );
        setSelectYes1(selectYes1.length);
        const selectNo1 = selectedNames.filter((i) => i.adv_DIR3 === "DNR");
        setSelectNo1(selectNo1.length);
        const selectYes2 = selectedNames.filter((i) => i.adv_DIR5 === "Yes");
        setSelectYes2(selectYes2.length);
        const selectNo2 = selectedNames.filter((i) => i.adv_DIR5 === "No");
        setSelectNo2(selectNo2.length);
        const selectYes3 = selectedNames.filter((i) => i.adv_DIR4 === "Yes");
        setSelectYes3(selectYes3.length);
        const selectNo3 = selectedNames.filter((i) => i.adv_DIR4 === "No");
        setSelectNo3(selectNo3.length);
        const selectYes4 = selectedNames.filter((i) => i.cat1 === "Yes");
        setSelectYes4(selectYes4.length);
        const selectNo4 = selectedNames.filter((i) => i.cat1 === "No");
        setSelectNo4(selectNo4.length);
        const selectYes5 = selectedNames.filter((i) => i.cat4 === "Yes");
        setSelectYes5(selectYes5.length);
        const selectNo5 = selectedNames.filter((i) => i.cat4 === "No");
        setSelectNo5(selectNo5.length);
        const selectYes6 = selectedNames.filter((i) => i.cat5 === "Yes");
        setSelectYes6(selectYes6.length);
        const selectNo6 = selectedNames.filter((i) => i.cat5 === "No");
        setSelectNo6(selectNo6.length);
        const selectYes7 = selectedNames.filter((i) => i.fall_RISK_1 === "Yes");
        setSelectYes7(selectYes7.length);
        const selectNo7 = selectedNames.filter((i) => i.fall_RISK_1 === "No");
        setSelectNo7(selectNo7.length);
        const selectYes8 = selectedNames.filter((i) => i.fall_RISK_2 === "Yes");
        setSelectYes8(selectYes8.length);
        const selectNo8 = selectedNames.filter((i) => i.fall_RISK_2 === "No");
        setSelectNo8(selectNo8.length);
        const selectYes9 = selectedNames.filter((i) => i.skin_RISK_1 === "Yes");
        setSelectYes9(selectYes9.length);
        const selectNo9 = selectedNames.filter((i) => i.skin_RISK_1 === "No");
        setSelectNo9(selectNo9.length);

        const selectYes10 = selectedNames.filter(
          (i) => i.skin_RISK_2 === "Braden"
        );
        setSelectYes10(selectYes10.length);
        const selectNo10 = selectedNames.filter((i) => i.skin_RISK_2 === "n/a");
        setSelectNo10(selectNo10.length);
        const selectNValue10 = selectedNames.filter(
          (i) => i.skin_RISK_2 === null
        );
        setSelectNValue10(selectNValue10.length);
        const selectYes11 = selectedNames.filter(
          (i) => i.skin_RISK_5 === "Yes"
        );
        setSelectYes11(selectYes11.length);
        const selectNo11 = selectedNames.filter((i) => i.skin_RISK_5 === "No");
        setSelectNo11(selectNo11.length);

        const selectSkinValue1 = selectedNames.filter(
          (i) => i.skin_RISK_3 === "n/a"
        );
        setSelectSkinValue1(selectSkinValue1.length);
        const selectSkinValue2 = selectedNames.filter(
          (i) => i.skin_RISK_3 === "Very High Risk"
        );
        setSelectSkinValue2(selectSkinValue2.length);
        const selectSkinValue3 = selectedNames.filter(
          (i) => i.skin_RISK_3 === "At Risk"
        );
        setSelectSkinValue3(selectSkinValue3.length);
        const selectSkinValue4 = selectedNames.filter(
          (i) => i.skin_RISK_3 === "Moderate Risk"
        );
        setSelectSkinValue4(selectSkinValue4.length);

        const selectSuprapublicValue = data.filter(
          (i) => i.cat2 === "Suprapublic"
        );
        const selectFoleyValue = data.filter((i) => i.cat2 === "Foley");
        setSelectSuprapublicValue(selectSuprapublicValue.length);
        setSelectFoleyValue(selectFoleyValue.length);

        setIsLoading(false);
      });
  }, [selectedNames]);

  function handleClick(info) {
    const data = values.find((item) => item.id === info.id);

    setSingle(data);
  }

  return (
    <div style={{ display: "flex" }}>
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
          <div style={{ width: "90%" }}>
            <div style={{ display: "flex" }} className="container">
              {chartOptions.map((options, index) => {
                return (
                  <div className="chart-container" key={index}>
                    <Chart
                      className="color"
                      chartType="PieChart"
                      data={
                        options.title === "ADVANCED DIRECTIVE(S)"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.adv_DIR1, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes],
                                ["No", selectNo],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue],
                                ["No", noValue],
                              ]
                          : options.title === "ADVANCED DIRECTIVE(S) TYPES"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.adv_DIR3, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes1],
                                ["No", selectNo1],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Full Code", yesValue1],
                                ["DNR", noValue1],
                              ]
                          : options.title === "ADV CARE PLAN"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.adv_DIR5, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes2],
                                ["No", selectNo2],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue2],
                                ["No", noValue2],
                              ]
                          : options.title === "ADV DOCTORS ORDERS"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.adv_DIR4, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes3],
                                ["No", selectNo3],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue3],
                                ["No", noValue3],
                              ]
                          : ""
                      }
                      options={options}
                    />
                    {options.path && (
                      <Link to={options.path}>
                        <AppsIcon
                          style={{
                            position: "absolute",
                            left: "270px",
                            top: "17px",
                          }}
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{ display: "flex", marginTop: "20px" }}
              className="container"
            >
              {chartOptions1.map((options, index) => {
                return (
                  <div
                    className="chart-container"
                    // style={{
                    //   width: "200px",
                    //   height: "200px",
                    //   margin: "40px",
                    //   padding: "10px",
                    //   border: "1px solid #b80c0c",
                    // }}
                    key={index}
                  >
                    <Chart
                      className="color"
                      chartType="PieChart"
                      data={
                        options.title === "CATHETER"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.cat1, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes4],
                                ["No", selectNo4],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue4],
                                ["No", noValue4],
                              ]
                          : options.title === "CATHETER TYPES"
                          ? //  &&
                            //   single &&
                            //   single.cat2 !== undefined
                            single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.cat2, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectSuprapublicValue],
                                ["No", selectFoleyValue],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Suprapublic", suprapublic],
                                ["Foley", foley],
                              ]
                          : options.title === "CATHETER CARE PLAN"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.cat4, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes5],
                                ["No", selectNo5],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue5],
                                ["No", noValue5],
                              ]
                          : options.title === "CATHETER INDICATION"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.cat5, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes6],
                                ["No", selectNo6],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue6],
                                ["No", noValue6],
                              ]
                          : ""
                      }
                      options={options}
                    />
                    {/* {(options.path 
                    
                    && single && single.cat1 !== undefined) ||
                      (single && single.cat2 !== undefined) ||
                      (single && single.cat4 !== undefined) ||
                      (single.cat5 !== undefined && (
                        <Link to={options.path}>
                          <AppsIcon
                            style={{
                              position: "absolute",
                              left: "270px",
                              top: "17px",
                            }}
                          />
                        </Link>
                      ))} */}
                    {options.path && (
                      <Link to={options.path}>
                        <AppsIcon
                          style={{
                            position: "absolute",
                            left: "270px",
                            top: "17px",
                          }}
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{ display: "flex", marginTop: "20px" }}
              className="container"
            >
              {chartOptions2.map((options, index) => {
                return (
                  <div className="chart-container" key={index}>
                    <Chart
                      className="color"
                      chartType="PieChart"
                      data={
                        options.title === "FALL RISK ASSESSMENT"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.fall_RISK_1, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes7],
                                ["No", selectNo7],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue7],
                                ["No", noValue7],
                              ]
                          : options.title === "FALL RISK CARE PLAN"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.fall_RISK_2, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes8],
                                ["No", selectNo8],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue8],
                                ["No", noValue8],
                              ]
                          : ""
                      }
                      options={options}
                    />
                    {options.path && (
                      <Link to={options.path}>
                        <AppsIcon
                          style={{
                            position: "absolute",
                            left: "270px",
                            top: "17px",
                          }}
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{ display: "flex", marginTop: "20px" }}
              className="container"
            >
              {chartOptions3.map((options, index) => {
                return (
                  <div className="chart-container" key={index}>
                    <Chart
                      className="color"
                      chartType="PieChart"
                      data={
                        options.title === "SKIN RISK ASSESSMENT"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.skin_RISK_1, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes9],
                                ["No", selectNo9],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue9],
                                ["No", noValue9],
                              ]
                          : options.title === "SKIN RISK CATEGORY"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.skin_RISK_2, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Braden", selectYes10],
                                ["nla", selectNo10],
                                ["0", selectNValue10],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Braden", yesValue10],
                                ["n/a", noValue10],
                                ["0", nValue10],
                              ]
                          : options.title === "SKIN RISK SCORE"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.skin_RISK_3, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["0", selectSkinValue1],
                                ["Very High Risk", selectSkinValue2],
                                ["At Risk", selectSkinValue3],
                                ["Moderate Risk", selectSkinValue4],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["0", skinValue1],
                                ["Very High Risk", skinValue2],
                                ["At Risk", skinValue3],
                                ["Moderate Risk", skinValue4],
                              ]
                          : options.title === "SKIN RISK CARE PLAN"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.skin_RISK_5, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes11],
                                ["No", selectNo11],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue11],
                                ["No", noValue11],
                              ]
                          : ""
                      }
                      options={options}
                    />
                    {options.path && (
                      <Link to={options.path}>
                        <AppsIcon
                          style={{
                            position: "absolute",
                            left: "270px",
                            top: "17px",
                          }}
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ width: "10%", height: "100%" }}>
            <div style={{ height: "100px" }}></div>
            <div
              style={{
                width: "100%",
                alignItems: "end",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <GradingIcon
                onClick={() => {
                  setIsMultiSelect(!isMultiSelect);
                }}
              />
              <FilterAltIcon
                onClick={() => {
                  setButtonStates();
                  setMultiButtonStates([]);
                  setSingle();
                }}
              />
            </div>
            <div
              style={{
                height: "280px",
                width: "100%",
                overflowY: "scroll",
                // overflowX: "hidden",
              }}
            >
              {values.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      // display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <li style={{ listStyleType: "none" }}>
                      {/* <button
                        style={{
                          width: "100%",
                          height: "30px",
                          fontSize: "11px",
                          backgroundColor: "blue",
                          color: "#fff",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          if (!isMultiSelect) {
                            handleClick(item);
                          } else {
                            setSingle();
                            if (
                              selectedNames.length > 0 &&
                              selectedNames.some(
                                (selectedItem) => selectedItem.id === item.id
                              )
                            ) {
                              setSelectedNames((prev) =>
                                prev.filter(
                                  (selectedItem) => selectedItem.id !== item.id
                                )
                              );
                            } else {
                              setSelectedNames((prev) => [...prev, item]);
                            }
                          }
                        }}
                      >
                        {item.patientname}
                      </button> */}
                      {values.map((item, index) => (
                        <button
                          key={item.id}
                          style={{
                            width: "100%",
                            height: "30px",
                            fontSize: "11px",
                            backgroundColor:
                              !isMultiSelect &&
                              single &&
                              buttonStates === item.id
                                ? "red"
                                : isMultiSelect && multibuttonStates[index]
                                ? "red"
                                : "blue",
                            color: "#fff",
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            if (!isMultiSelect) {
                              handleClick(item);
                              setButtonStates(item.id);
                            } else {
                              setSingle();
                              if (
                                selectedNames.length > 0 &&
                                selectedNames.some(
                                  (selectedItem) => selectedItem.id === item.id
                                )
                              ) {
                                setSelectedNames((prev) =>
                                  prev.filter(
                                    (selectedItem) =>
                                      selectedItem.id !== item.id
                                  )
                                );
                              } else {
                                setSelectedNames((prev) => [...prev, item]);
                              }
                              setMultiButtonStates((prevStates) => {
                                const newStates = [...prevStates];
                                newStates[index] = !newStates[index];
                                return newStates;
                              });
                            }
                          }}
                        >
                          {item.patientname}
                        </button>
                      ))}
                    </li>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentBarView;
