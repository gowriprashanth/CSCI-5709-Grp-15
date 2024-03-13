import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

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

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
