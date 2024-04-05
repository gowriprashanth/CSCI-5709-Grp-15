/**
 * @author Bhautik Koshiya
 */
import { useCallback, useEffect, useState } from "react";
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
  CloseCircleTwoTone,
  ProfileOutlined,
} from "@ant-design/icons";
import axiosHelper from "../../../helper/axioshelper";



function Header({ name, subName, onPress }) {
  
  const [notifications, setNotifications] = useState([]);

const items = [];

const calculateHoursAgo = (timestamp) => {
  const currentTime = new Date();
  const pastTime = new Date(timestamp);
  const timeDifference = currentTime - pastTime;
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
  return hoursAgo;
};

const handleNotificationClick = async (notificationId) => {
  try {
    // Make API call to mark notification as read
    await axiosHelper.put(`notification/${notificationId}`);

    // Update state to remove the clicked notification
    setNotifications(notifications.filter(notification => notification._id !== notificationId));
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

notifications.forEach((item) => {
  const time = calculateHoursAgo(item.createdAt)
  items.push({
    label: (
      <List.Item.Meta
      onClick={() => handleNotificationClick(item._id)}
        style={{
          padding: "10px",
        }}
        avatar={<Avatar shape="square" src={<CloseCircleTwoTone />} />}
        title={item.message}
        description={`${time} hours ago`}
      />
    ),
    key: item.title,
  });
});

const fetchNotifications = useCallback( async () => {
  try {
    const email = localStorage.getItem("email")
    const response = await axiosHelper.get(`notification/getNotification`, {
      params: { email },
    });
    setNotifications(response.data); 
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}, []);

  useEffect(() => {

    fetchNotifications(); 
  }, [fetchNotifications]);


  useEffect(() => window.scrollTo(0, 0));

  const logOutHandler = () => {
    localStorage.clear("token");
    localStorage.clear("role");
    localStorage.clear("id");
    localStorage.clear("email");
  };

  return (
    <div style={{ height: "100%" }}>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/dashboard">Pages</NavLink>
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
          <Badge size="small" count={notifications.length}>
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
