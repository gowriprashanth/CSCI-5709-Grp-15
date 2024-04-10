import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { fetchLineChartData } from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const [chartData, setChartData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      try {
        const data = await fetchLineChartData();
        if (isMounted) {
          setChartData(data); 
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Departments</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+25%</span>
          </Paragraph>
        </div>
        <div className="tickets">
          <ul>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "5px",
                  backgroundColor: "#2196f3",
                }}
              ></span>{" "}
              Created
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "5px",
                  backgroundColor: "#4caf50",
                }}
              ></span>{" "}
              Resolved
            </li>
          </ul>
        </div>
      </div>
      <div className="chart-container" style={{ overflowX: "auto" }}>
      {chartData && (
        <ReactApexChart
          className="full-width"
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={400}
          width={"300%"}
        />
      )}
      </div>
    </>
  );
}

export default LineChart;
