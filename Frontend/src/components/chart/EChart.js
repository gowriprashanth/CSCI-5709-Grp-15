import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "220",
      user: "Created",
    },
    {
      Title: "120",
      user: " Resolved",
    },
    {
      Title: "100",
      user: "Open ",
    },
    {
      Title: "92%",
      user: "Customer Satisfaction",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Resolved Tickets</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Resolved Tickets Compared to last week
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
