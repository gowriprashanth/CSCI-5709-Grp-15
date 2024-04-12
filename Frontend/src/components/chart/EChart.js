import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { fetchEChartData, fetchTicketStatus } from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;
  const [chartData, setChartData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEChartData();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();

    fetchTicketStatus() 
      .then(response => {
        if (response.success) {
          const ticketStatusData = response.data;
          const updatedItems = ticketStatusData.map(statusData => ({
            user: statusData.status, 
            count: statusData.data.reduce((acc, curr) => acc + curr.count, 0) 
          }));
          setItems(updatedItems);
        } else {
          console.error('Error fetching ticket status:', response.message);
        }
      })
      .catch(error => {
        console.error('Error fetching ticket status:', error);
      });

  }, []);

  return (
    <>
      <div id="chart">
        {chartData && (
          <ReactApexChart
            className="bar-chart"
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={220}
          />
        )}
      </div>
      <div className="chart-vistior">
        <Title level={5}>Resolved Tickets</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          Ticket status
        </Paragraph>
        <Row gutter>
          {items.map((item, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{item.count}</Title>
                <span>{item.user}</span> {/* Display count */}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
