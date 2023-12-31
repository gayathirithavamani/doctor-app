import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import "../style/dashboard.css";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AppsIcon from "@mui/icons-material/Apps";
import GradingIcon from "@mui/icons-material/Grading";
import { Spin } from "antd";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [yesValue0, setYesValue0] = useState();
  const [noValue0, setNoValue0] = useState();
  const [refusedValue0, setRefusedValue0] = useState();
  const [yesValue, setYesValue] = useState();
  const [noValue, setNoValue] = useState();
  const [refusedValue, setRefusedValue] = useState();
  const [blankValue0, setBlankValue0] = useState();
  const [blankValue, setBlankValue] = useState();
  const [yesValue1, setYesValue1] = useState();
  const [noValue1, setNoValue1] = useState();
  const [refusedValue1, setRefusedValue1] = useState();
  const [blankValue1, setBlankValue1] = useState();
  const [yesValue2, setYesValue2] = useState();
  const [noValue2, setNoValue2] = useState();
  const [refusedValue2, setRefusedValue2] = useState();
  const [blankValue2, setBlankValue2] = useState();
  const [yesValue3, setYesValue3] = useState();
  const [noValue3, setNoValue3] = useState();
  const [refusedValue3, setRefusedValue3] = useState();
  const [blankValue3, setBlankValue3] = useState();
  const [yesValue4, setYesValue4] = useState();
  const [noValue4, setNoValue4] = useState();
  const [refusedValue4, setRefusedValue4] = useState();
  const [blankValue4, setBlankValue4] = useState();
  const [values, setValues] = useState([]);
  const [single, setSingle] = useState();

  const [selectedNames, setSelectedNames] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectYes0, setSelectYes0] = useState();
  const [selectNo0, setSelectNo0] = useState();
  const [selectRefused0, setSelectRefused0] = useState();
  const [selectYes, setSelectYes] = useState();
  const [selectNo, setSelectNo] = useState();
  const [selectRefused, setSelectRefused] = useState();
  const [selectYes1, setSelectYes1] = useState();
  const [selectNo1, setSelectNo1] = useState();
  const [selectRefused1, setSelectRefused1] = useState();
  const [selectYes2, setSelectYes2] = useState();
  const [selectNo2, setSelectNo2] = useState();
  const [selectRefused2, setSelectRefused2] = useState();
  const [selectYes3, setSelectYes3] = useState();
  const [selectNo3, setSelectNo3] = useState();
  const [selectRefused3, setSelectRefused3] = useState();
  const [selectYes4, setSelectYes4] = useState();
  const [selectNo4, setSelectNo4] = useState();
  const [selectRefused4, setSelectRefused4] = useState();

  const [multibuttonStates, setMultiButtonStates] = useState(
    values.map(() => false)
  );

  const [buttonStates, setButtonStates] = useState();

  const chartName = [
    {
      id: 1,
      name: "PNEUMOCOCCAL",
      path: "/dashboardView",
    },
    {
      id: 2,
      name: "PREVNAR",
      path: "/prevnarView",
    },
    {
      id: 3,
      name: "INFLUENZA",
      path: "/dashboardDonut",
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

  const chartName1 = [
    {
      id: 1,
      name: "COVID VACCINE 1",
      path: "/dashboardCovid",
    },
    {
      id: 2,
      name: "COVID VACCINE 2",
      path: "/dashboardCovid2",
    },
    {
      id: 3,
      name: "COVID BOOSTER",
      path: "/dashboardBooster",
    },
  ];
  const options1 = chartName1.map((item) => ({
    title: item.name,
    path: item.path,
    is3D: false,
    legend: {
      position: "right",
      maxLines: 1,
      textStyle: {
        color: "white",
      },
    },
    pieSliceText: "value",
    fontSize: 11,
    slices: {
      0: { color: "#E74C3C" },
      1: { color: "#3498DB" },
      2: { color: "#C39BD3" },
    },
    chartArea: { width: 250, height: 150 },
    pieHole: 0.25,
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
        const yesValue0 = data.filter((i) => i.imm_PREVNAR_Y === "Yes");
        const noValue0 = data.filter((i) => i.imm_PREVNAR_Y === "No");
        const refusedValue0 = data.filter((i) => i.imm_PREVNAR_Y === "Refused");
        const blankValue0 = data.filter((i) => i.imm_PREVNAR_Y === null);
        setBlankValue0(blankValue0.length);
        setYesValue0(yesValue0.length);
        setNoValue0(noValue0.length);
        setRefusedValue0(refusedValue0.length);
        const yesValue = data.filter((i) => i.imm_PNEUMO_Y === "Yes");
        const noValue = data.filter((i) => i.imm_PNEUMO_Y === "No");
        const refusedValue = data.filter((i) => i.imm_PNEUMO_Y === "Refused");
        const blankValue = data.filter((i) => i.imm_PNEUMO_Y === null);
        setBlankValue(blankValue.length);
        setYesValue(yesValue.length);
        setNoValue(noValue.length);
        setRefusedValue(refusedValue.length);

        const yesValue1 = data.filter((i) => i.imm_FLU_Y === "Yes");
        const noValue1 = data.filter((i) => i.imm_FLU_Y === "No");
        const refusedValue1 = data.filter((i) => i.imm_FLU_Y === "Refused");
        const blankValue1 = data.filter((i) => i.imm_FLU_Y === null);
        setBlankValue1(blankValue1.length);
        setYesValue1(yesValue1.length);
        setNoValue1(noValue1.length);
        setRefusedValue1(refusedValue1.length);

        const yesValue2 = data.filter((i) => i.imm_COVID_Y === "Yes");
        const noValue2 = data.filter((i) => i.imm_COVID_Y === "No");
        const refusedValue2 = data.filter((i) => i.imm_COVID_Y === "Refused");
        const blankValue2 = data.filter((i) => i.imm_COVID_Y === null);
        setBlankValue2(blankValue2.length);
        setYesValue2(yesValue2.length);
        setNoValue2(noValue2.length);
        setRefusedValue2(refusedValue2.length);

        const yesValue3 = data.filter((i) => i.imm_COVID_Y2 === "Yes");
        const noValue3 = data.filter((i) => i.imm_COVID_Y2 === "No");
        const refusedValue3 = data.filter((i) => i.imm_COVID_Y2 === "Refused");
        const blankValue3 = data.filter((i) => i.imm_COVID_Y2 === null);
        setBlankValue3(blankValue3.length);
        setYesValue3(yesValue3.length);
        setNoValue3(noValue3.length);
        setRefusedValue3(refusedValue3.length);

        const yesValue4 = data.filter((i) => i.imm_COVID_Y3 === "Yes");
        const noValue4 = data.filter((i) => i.imm_COVID_Y3 === "No");
        const refusedValue4 = data.filter((i) => i.imm_COVID_Y3 === "Refused");
        const blankValue4 = data.filter((i) => i.imm_COVID_Y3 === null);
        setBlankValue4(blankValue4.length);
        setYesValue4(yesValue4.length);
        setNoValue4(noValue4.length);
        setRefusedValue4(refusedValue4.length);

        const selectYes0 = selectedNames.filter(
          (i) => i.imm_PREVNAR_Y === "Yes"
        );
        setSelectYes0(selectYes0.length);
        const selectNo0 = selectedNames.filter((i) => i.imm_PREVNAR_Y === "No");
        setSelectNo0(selectNo0.length);
        const selectRefused0 = selectedNames.filter(
          (i) => i.imm_PREVNAR_Y === "Refused"
        );
        setSelectRefused0(selectRefused0.length);

        const selectYes = selectedNames.filter((i) => i.imm_PNEUMO_Y === "Yes");
        setSelectYes(selectYes.length);
        const selectNo = selectedNames.filter((i) => i.imm_PNEUMO_Y === "No");
        setSelectNo(selectNo.length);
        const selectRefused = selectedNames.filter(
          (i) => i.imm_PNEUMO_Y === "Refused"
        );
        setSelectRefused(selectRefused.length);
        const selectYes1 = selectedNames.filter((i) => i.imm_FLU_Y === "Yes");
        setSelectYes1(selectYes1.length);
        const selectNo1 = selectedNames.filter((i) => i.imm_FLU_Y === "No");
        setSelectNo1(selectNo1.length);
        const selectRefused1 = selectedNames.filter(
          (i) => i.imm_FLU_Y === "Refused"
        );
        setSelectRefused1(selectRefused1.length);
        const selectYes2 = selectedNames.filter((i) => i.imm_COVID_Y === "Yes");
        setSelectYes2(selectYes2.length);
        const selectNo2 = selectedNames.filter((i) => i.imm_COVID_Y === "No");
        setSelectNo2(selectNo2.length);
        const selectRefused2 = selectedNames.filter(
          (i) => i.imm_COVID_Y === "Refused"
        );

        setSelectRefused2(selectRefused2.length);
        const selectYes3 = selectedNames.filter(
          (i) => i.imm_COVID_Y2 === "Yes"
        );
        setSelectYes3(selectYes3.length);
        const selectNo3 = selectedNames.filter((i) => i.imm_COVID_Y2 === "No");
        setSelectNo3(selectNo3.length);
        const selectRefused3 = selectedNames.filter(
          (i) => i.imm_COVID_Y2 === "Refused"
        );
        setSelectRefused3(selectRefused3.length);
        const selectYes4 = selectedNames.filter(
          (i) => i.imm_COVID_Y3 === "Yes"
        );
        setSelectYes4(selectYes4.length);
        const selectNo4 = selectedNames.filter((i) => i.imm_COVID_Y3 === "No");
        setSelectNo4(selectNo4.length);
        const selectRefused4 = selectedNames.filter(
          (i) => i.imm_COVID_Y3 === "Refused"
        );
        setSelectRefused4(selectRefused4.length);

        setIsLoading(false);
      });
  }, [selectedNames]);

  function handleClick(info) {
    const data = values.find((item) => item.id === info.id);
    setSingle(data);
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100vh",
        backgroundColor: "rgba(78,78,78)",
      }}
    >
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
        <>
          <div style={{ width: "90%", height: "100px" }}>
            <div style={{ display: "flex", width: "80%" }}>
              {chartOptions.map((options, index) => {
                return (
                  <div className="chart-container" key={index}>
                    <Chart
                      className="color"
                      chartType="PieChart"
                      data={
                        options.title === "PNEUMOCOCCAL"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.imm_PNEUMO_Y, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes],
                                ["No", selectNo],
                                ["Refused", selectRefused],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue],
                                ["No", noValue],
                                ["Refused", refusedValue],
                                ["(Blank)", blankValue],
                              ]
                          : options.title === "PREVNAR"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.imm_PREVNAR_Y, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],

                                ["Yes", selectYes0],
                                ["No", selectNo0],
                                ["Refused", selectRefused0],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue0],
                                ["No", noValue0],
                                ["Refused", refusedValue0],
                                ["(Blank)", blankValue0],
                              ]
                          : single
                          ? [
                              ["Task", "Hours per Day"],
                              [single.imm_FLU_Y, "1"],
                            ]
                          : isMultiSelect && selectedNames.length > 0
                          ? [
                              ["Task", "Hours per Day"],

                              ["Yes", selectYes1],
                              ["No", selectNo1],
                              ["Refused", selectRefused1],
                            ]
                          : [
                              ["Task", "Hours per Day"],
                              ["Yes", yesValue1],
                              ["No", noValue1],
                              ["Refused", refusedValue1],
                              ["(Blank)", blankValue1],
                            ]
                      }
                      options={options}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "300px",
                        top: "10px",
                      }}
                    >
                      <Link to={options.path}>
                        <AppsIcon />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", marginTop: "10px" }}>
              {options1.map((option, index) => {
                return (
                  <div className="chart-container" key={index}>
                    <Chart
                      className="color"
                      chartType="PieChart"
                      data={
                        option.title === "COVID VACCINE 1"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.imm_COVID_Y, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],
                                ["Yes", selectYes2],
                                ["No", selectNo2],
                                ["Refused", selectRefused2],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue2],
                                ["No", noValue2],
                                ["Refused", refusedValue2],
                                ["(Blank)", blankValue2],
                              ]
                          : option.title === "COVID VACCINE 2"
                          ? single
                            ? [
                                ["Task", "Hours per Day"],
                                [single.imm_COVID_Y2, "1"],
                              ]
                            : isMultiSelect && selectedNames.length > 0
                            ? [
                                ["Task", "Hours per Day"],
                                ["Yes", selectYes3],
                                ["No", selectNo3],
                                ["Refused", selectRefused3],
                              ]
                            : [
                                ["Task", "Hours per Day"],
                                ["Yes", yesValue3],
                                ["No", noValue3],
                                ["Refused", refusedValue3],
                                ["(Blank)", blankValue3],
                              ]
                          : single
                          ? [
                              ["Task", "Hours per Day"],
                              [single.imm_COVID_Y3, "1"],
                            ]
                          : isMultiSelect && selectedNames.length > 0
                          ? [
                              ["Task", "Hours per Day"],
                              ["Yes", selectYes4],
                              ["No", selectNo4],
                              ["Refused", selectRefused4],
                            ]
                          : [
                              ["Task", "Hours per Day"],
                              ["Yes", yesValue4],
                              ["No", noValue4],
                              ["Refused", refusedValue4],
                              ["(Blank)", blankValue4],
                            ]
                      }
                      options={option}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "300px",
                        top: "10px",
                      }}
                    >
                      <Link to={option.path}>
                        <AppsIcon />
                      </Link>
                    </div>
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
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {values.map((item,index) => {
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

export default Dashboard;
