import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";


function Analytics() {
  const { Title } = Typography;

  
  const ticket = (
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <rect width="20" height="20" rx="2" fill="#fff" />
    </svg>
  );
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const watch = (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V14C6 16.2091 7.79086 18 10 18C12.2091 18 14 16.2091 14 14V6C14 3.79086 12.2091 2 10 2ZM10 20C14.4183 20 18 16.4183 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 16.4183 5.58172 20 10 20Z"
        fill="#fff"
      ></path>
      <path
        d="M10 6C10.5523 6 11 6.44772 11 7V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V7C9 6.44772 9.44772 6 10 6Z"
        fill="#fff"
      ></path>
    </svg>
  );
  const count = [
    {
      today: "Tickets Resolved Today",
      title: "53",
      persent: "+30%",
      icon:ticket,
      bnb: "bnb2",
    },
    {
      today: "Average Response Time",
      title: "0h 45m",
      persent: "-20%",
      icon: watch,
      bnb: "bnb2",
    },
    {
      today: "User Satisfaction",
      title: "4.2/5",
      persent: "+20%",
      icon: heart,
      bnb: "bnb2",
    },
    {
      today: "Average Resolution Time",
      title: "4h 25m",
      persent: "-10%",
      icon:watch,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        
      </div>
    </>
  );
}

export default Analytics;
