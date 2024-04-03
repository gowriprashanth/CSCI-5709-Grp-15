import React, { Component } from "react";
import { Layout, Menu, Button, Card, Form, Input, Checkbox, Radio } from "antd";
import "./SignUp.css";
import { Link } from "react-router-dom";
import HeaderAuthentication from "../../components/layout/HeaderAuthentication";

const { Footer, Content } = Layout;

export default class SignUp extends Component {
  handleSignUp = (values) => {
    const { name, email, password, role, remember } = values;
    if (name && email && password && role && remember) {
      this.setState({ isLogin: true }, () => {
        localStorage.setItem("isLogin", this.state.isLogin);
        this.props.history.push("/dashboard");
        console.log(role);
      });
    } else {
      console.log("UserName, Email and Password are required.");
    }
  };

  render() {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <>
        <div className="layout-default layout-sign-up">
          <HeaderAuthentication className="header" />
          <Content className="p-0 inside">
            <Card
              className="card-signup header-solid h-full ant-card signup-header"
              title={<h5>Sign Up</h5>}
              bordered="false"
            >
              <Form
                name="basic"
                initialValues={{ remember: false }}
                onFinish={this.handleSignUp}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                    {
                      min: 5,
                      message: "Name must be at least 5 characters long!",
                    },
                    {
                      pattern: /^[^\s]+$/,
                      message: "Name should not contain whitespace!",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>

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

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          value &&
                          value.length >= 8 &&
                          /[a-z]/.test(value) &&
                          /[A-Z]/.test(value) &&
                          /[0-9]/.test(value) &&
                          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Password must be at least 8 characters long and include at least one digit, one capital letter, one small letter, and one special character."
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="role"
                  rules={[
                    { required: true, message: "Please select your role!" },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="admin">Admin</Radio>
                    <Radio value="employee">Employee</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please accept the Terms and Conditions")
                        );
                      },
                    }),
                  ]}
                >
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Content>
          <Footer>
            <Menu mode="horizontal">
              <Menu.Item>Developed by Group 15</Menu.Item>
            </Menu>
          </Footer>
        </div>
      </>
    );
  }
}
