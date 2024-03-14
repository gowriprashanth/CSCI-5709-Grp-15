import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Form, Input, Card } from "antd";
import HeaderAuthentication from "../../components/layout/headerauthentication/HeaderAuthentication";
import "../signin/SignIn.css"
import { message } from "antd";

const { Footer, Content } = Layout;
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isLogin: false
    // };

    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  handleForgotPassword = (values) => {
    message.success(
      "An email with a reset-password link has been sent to your email address."
    );
    this.props.history.push("/reset-password");
  };

  render() {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout className="layout-default layout-signin">
          <HeaderAuthentication />
          <Content className="p-0 inside">
            <Card
              className="card-signup header-solid h-full ant-card signup-header"
              title={<h5>Forgot Password</h5>}
              bordered="false"
            >
              <Form
                onFinish={this.handleForgotPassword}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    // {
                    //   type: 'email',
                    //   message: 'Please enter a valid email address!'
                    // },
                    {
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address!",
                    },
                    {
                      validator(_, value) {
                        if (
                          /^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                            value
                          )
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Email should not start with a special character!"
                          )
                        );
                      },
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Forgot Password
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
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
