import { Row, Col, Card, Avatar, message } from "antd";
import { Button, Form, Input } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import { SmileFilled } from "@ant-design/icons";
function Settings() {
  const onFinish = () => {
    message.success({
      content: "Profile Updated Successfully!",

      style: {
        marginTop: "10vh",
      },
    });
  }

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>
      <Card
        className="card-profile-head"
        bordered={false}
        bodyStyle={{ display: "none" }}
        style={{
          borderRadius: 10,
          boxShadow: "0 0 10px 0 rgba(183, 183, 183, 0.9)",
        }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  style={{
                    padding: "0",
                    margin: "0",
                  }}
                  shape="square"
                  src={
                    <SmileFilled
                      style={{
                        color: "black",
                        margin: "0",
                      }}
                    />
                  }
                />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">Narendra Modi</h4>
                  <p>PM / Mod</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row align="center">
        <Col span={1} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h1 style={{ marginBottom: "0" }}>Edit Profile</h1>}
            style={{ borderColor: "#ADADAD", borderRadius: 10, width: "100%" }}
          >
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="First Name"
                name="firstname"
                initialValue={"Narendra"}
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastname"
                initialValue={"Modi"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                initialValue={"pmo@gov.in"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Email Address!",
                  },
                  {
                    pattern:
                      /^[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: "Please enter a valid Email Address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Current Password"
                name="currentpassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your Current Password"
                  style={{ borderRadius: 7 }}
                />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newpassword"
                rules={[
                  {
                    message: "Please input your new password!",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one symbol, one number, one lowercase letter, one uppercase letter, and be at least 8 characters long.",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Enter your New Password"
                  style={{ borderRadius: 7 }}
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Settings;
