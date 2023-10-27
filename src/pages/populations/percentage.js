import React, { useEffect, useState } from "react";
import BarChart from "../../components/bar-chart";
import HighchartsComponent from "./stackedChart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../style/dashboard.css";
import { Spin } from "antd";

function Percentage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dementiaValue, setDementiaValue] = useState([]);
  const [diagnosisCounts, setDiagnosisCounts] = useState([]);
  const [percentagevalue, setPercentageValue] = useState([]);
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
                seriesData={percentagevalue}
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
                }}
              >
                {single && single.patientname && (
                  <p>
                    <strong>Patient Name:</strong> {single.patientname}
                  </p>
                )}
                {single &&
                  single.caregaps &&
                  splitCaregapsIntoBulletPoints(single.caregaps).map(
                    (point, index) => <p key={index}>• {point}</p>
                  )}
              </div>
            )}
          </div>
          <div style={{ height: "895px" }}>
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
                  style={{ fontSize: "10px", color: "#222" }}
                >
                  f 70+
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button className="button" style={{ fontSize: "10px" }}>
                  Blank
                </button>
              </li>
            </div>
            <div style={{ height: "25%", overflowY: "scroll" }}>
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
                  style={{ fontSize: "10px" }}
                >
                  0
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData("Improved")}
                  style={{ fontSize: "10px" }}
                >
                  Improved
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData("No change")}
                  style={{ fontSize: "10px" }}
                >
                  No Change
                </button>
              </li>
              <li style={{ listStyleType: "none" }}>
                <button
                  className="button"
                  onClick={() => handleFilteredData("Worsened")}
                  style={{ fontSize: "10px" }}
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
            <div style={{ overflowY: "auto", maxHeight: "400px" }}>
              {filtered.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <li style={{ listStyleType: "none" }}>
                      <button
                        style={{
                          width: "100px",
                          height: "30px",
                          fontSize: "10px",
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
