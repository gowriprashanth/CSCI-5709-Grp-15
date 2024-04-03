import { useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
} from "antd";
import { NavLink, Link } from "react-router-dom";
import {
  BellOutlined,
  ClockCircleOutlined,
  CloseCircleTwoTone,
  ProfileOutlined,
} from "@ant-design/icons";

const data = [
  {
    title: "New Tickets have been assigned to you.",
    description: <>{<ClockCircleOutlined />} 2 days ago</>,

    avatar: <CloseCircleTwoTone />,
  },
  {
    title: "Your ticket is resolved.",
    description: <>{<ClockCircleOutlined />} 2 days ago</>,

    avatar: <CloseCircleTwoTone />,
  },
];

const items = [];

data.forEach((item) => {
  items.push({
    label: (
      <List.Item.Meta
        style={{
          padding: "10px",
        }}
        avatar={<Avatar shape="square" src={item.avatar} />}
        title={item.title}
        description={item.description}
      />
    ),
    key: item.title,
  });
});

function Header({ name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));

  const logOutHandler = () => {
    localStorage.clear("token");
    localStorage.clear("role");
  };

  return (
    <div style={{ height: "100%" }}>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Link to="/sign-in" className="btn-sign-in" onClick={logOutHandler}>
            <span>Log Out</span>
          </Link>
          <Link to="/profile" className="btn-sign-in">
            <span>Profile</span>
          </Link>
          <Badge size="small" count={2}>
            <Dropdown
              overlayClassName="header-notifications-dropdown-overlay"
              overlayStyle={{
                width: "300px",
                maxHeight: "300px",
                overflow: "auto",
                borderRadius: "10px",
              }}
              menu={{ items }}
              trigger={["click"]}
            >
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {<BellOutlined />}
              </a>
            </Dropdown>
          </Badge>

          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {<ProfileOutlined />}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
