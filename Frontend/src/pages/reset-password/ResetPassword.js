import React, { Component } from "react";
import { Layout, Menu, Button, Form, Input, Card } from "antd";
import "../signin/SignIn.css";
import HeaderAuthentication from "../../components/layout/headerauthentication/HeaderAuthentication";
import { message } from "antd";

const { Footer, Content } = Layout;

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPasswordError: "",
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  handleResetPassword = (values) => {
    message.success("Your Password Successfully Updated.");
    this.props.history.push("/sign-in");
  };

  render() {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    // Custom validator function to check if passwords match
    const validatePassword = ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("The two passwords that you entered do not match!")
        );
      },
    });

    return (
      <>
        <Layout className="layout-default layout-signin">
          <HeaderAuthentication />
          <Content className="p-0 inside">
            <Card
              className="card-signup header-solid h-full ant-card signup-header"
              title={<h5>Reset Password</h5>}
              bordered="false"
            >
              <Form
                onFinish={this.handleResetPassword}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                      message:
                        "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                  className="username"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    validatePassword,
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Content>
          <Footer>
            <Menu mode="horizontal">
              <Menu.Item>Developed by Group 15</Menu.Item>
            </Menu>
          </Footer>
        </Layout>
      </>
    );
  }
}
