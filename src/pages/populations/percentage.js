import React, { useEffect, useState } from "react";
import BarChart from "../../components/bar-chart";
import HighchartsComponent from "./stackedChart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../style/dashboard.css";
import { Spin } from "antd";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function Percentage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dementiaValue, setDementiaValue] = useState([]);
  const [diagnosisCounts, setDiagnosisCounts] = useState([]);
  const [percentageValue, setPercentageValue] = useState([]);
  const [single, setSingle] = useState();
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState(result);
  const [isDescriptionVisible, setDescriptionVisible] = useState(true);

  function splitCaregapsIntoBulletPoints(caregaps) {
    if (!caregaps) return [];
    return caregaps.split(",").map((caregap) => caregap.trim());
  }
  useEffect(() => {
    fetch("http://localhost:9090/findall")
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setFiltered(data);

        const ageValue = data.filter((i) => i.patientage >= 70);

        console.log("Patients aged 70 and above:", ageValue);

        var listArray = [];
        data.map((item) => {
          const existingItemIndex = listArray.findIndex(
            (i) => i.name === item.diagnos_LIST
          );

          if (existingItemIndex === -1) {
            listArray.push({
              name: item.diagnos_LIST,
              y: data.filter((i) => i.diagnos_LIST === item.diagnos_LIST)
                .length,
            });
          }
        });

        setDiagnosisCounts(listArray);

        const diagnosListArray = data.map((item) => item.diagnos_LIST);
        let uniqueChars = [...new Set(diagnosListArray)];
        setDementiaValue(uniqueChars);

        const totalPatients = data.length;

        const percentageData = listArray.map((item) => ({
          name: item.name,
          y: Number(((item.y / totalPatients) * 100).toFixed(2)),
        }));

        setPercentageValue(percentageData);
        setIsLoading(false);
      });
  }, []);
  const paragraphStyle = {
    fontSize: "17px",
    fontFamily: "Calibri",
  };

  const handleFilteredData = (btn) => {
    if (btn === "all") {
      setFiltered(result);
    } else {
      const improvedList1 = result.filter(
        (i) => i.patient_CONDITION_DIAG_1 === btn && i.patientname
      );
      setFiltered(improvedList1);
    }
  };

  function handleClick(info) {
    const data = result.find((item) => item.id === info.id);
    setSingle(data);
  }

  return (
    <div style={{ display: "flex", width: "100%" }}>
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
          <div style={{ width: "40%", height: "40%" }}>
            <div className="background" style={{ marginBottom: "20px" }}>
              <BarChart
                seriesData={diagnosisCounts}
                xAxisValue={dementiaValue}
                format={"{point.y:1f}"}
                title={"PATIENT POPULATION BY DX"}
              />
            </div>
            <div className="background">
              <BarChart
                seriesData={percentageValue}
                xAxisValue={dementiaValue}
                format={"{point.y:1f}%"}
                title={"% OF DX CONDITION"}
              />
            </div>
          </div>
          <div style={{ width: "60%", height: "100%" }}>
            <HighchartsComponent className="stackedHeight" tableView={false} />

            {single && isDescriptionVisible && (
              <div
                className="description"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  lineHeight: "1",
                  color: "white",
                  fontFamily: "",
                }}
              >
                {single && single.patientname && (
                  <p>
                    <strong style={{ color: "#5DADEC", fontSize: "18px" }}>
                      CARE GAP FOR PATIENT:
                    </strong>{" "}
                    {single.patientname}
                  </p>
                )}

                {single &&
                  single.caregaps &&
                  splitCaregapsIntoBulletPoints(single.caregaps).map(
                    (point, index) => (
                      <p
                        key={index}
                        style={{ ...paragraphStyle, justifyContent: "start" }}
                      >
                        <RadioButtonCheckedIcon /> {point}
                      </p>
                    )
                  )}
              </div>
            )}
          </div>
          <div style={{ height: "280px" }}>
            <div>
              <div
                style={{
                  width: "100%",
                  alignItems: "end",
                  display: "flex",
                  justifyContent: "end",
                }}
                className="button"
              >
                <FilterAltIcon style={{ cursor: "pointer" }} />
              </div>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  style={{
                    fontSize: "15px",
                    color: "#fff",
                    fontFamily: "Calibri",
                    width: "100%",
                    height: "30px",

                    backgroundColor: "blue",

                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  f 70+
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  style={{
                    fontSize: "15px",
                    color: "#fff",
                    fontFamily: "Calibri",
                    width: "100%",
                    height: "30px",

                    backgroundColor: "blue",

                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  Blank
                </button>
              </li>
            </div>
            <div
              style={{
                height: "221px",
                overflowX: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  alignItems: "end",
                  display: "flex",
                  justifyContent: "end",
                }}
                className="button"
                onClick={() => handleFilteredData("all")}
              >
                <FilterAltIcon style={{ cursor: "pointer" }} />
              </div>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData(null)}
                  style={{
                    fontSize: "15px",
                    color: "#fff",
                    fontFamily: "Calibri",
                    width: "100%",
                    height: "30px",

                    backgroundColor: "blue",

                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  0
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData("Improved")}
                  style={{
                    fontSize: "15px",
                    color: "#fff",
                    fontFamily: "Calibri",
                    width: "100%",
                    height: "30px",

                    backgroundColor: "blue",

                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  Improved
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData("No change")}
                  style={{
                    fontSize: "15px",
                    color: "#fff",
                    fontFamily: "Calibri",
                    width: "100%",
                    height: "30px",

                    backgroundColor: "blue",

                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  No Change
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData("Worsened")}
                  style={{
                    fontSize: "15px",
                    color: "#fff",
                    fontFamily: "Calibri",
                    width: "100%",
                    height: "30px",

                    backgroundColor: "blue",

                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  Worsened
                </button>
              </li>
            </div>

            <div
              style={{
                width: "100%",
                alignItems: "end",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <FilterAltIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDescriptionVisible(!isDescriptionVisible); // Toggle visibility
                }}
              />
            </div>
            {/* <div style={{ overflowY: "auto", maxHeight: "400px" }}> */}
            <div
              style={{
                height: "280px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {filtered.map((item) => {
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
                      <button
                        style={{
                          width: "140px",
                          height: "30px",
                          fontSize: "15px",
                          fontFamily: "Calibri",
                          backgroundColor: "blue",
                          color: "#fff",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => handleClick(item)}
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
}

export default Percentage;
