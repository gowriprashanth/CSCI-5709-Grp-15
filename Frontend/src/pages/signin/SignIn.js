/**
 * @author Bhautik Koshiya
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Form, Input, Card } from "antd";
import "./SignIn.css";
import HeaderAuthentication from "../../components/layout/HeaderAuthentication";
import axios from "axios";
const { Footer, Content } = Layout;

//SignIn page
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      errorMessage: "",
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

 // It calls SignIn Api to get access to System
  handleSignIn = async (values) => {
    const { email, password } = values;
    if (email && password) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}user/signin`,
          {
            email: email,
            password: password,
          }
        );

        if (response.status === 200) {
          const responseData = response.data;
          console.log("response", responseData);
          this.setState({ token: responseData.token }, () => {
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("role", responseData.user.role);
            localStorage.setItem("id", responseData.user._id);
            localStorage.setItem("email", responseData.user.email);

            this.props.history.push("/dashboard");
          });
        }
      } catch (error) {
        console.log("errorr", error);
        console.error("Server Error");
        if (
          error.response &&
          error.response.status &&
          (error.response.status === 404 || error.response.status === 401)
        ) {
          this.setState({
            errorMessage: "Invalid email or password.",
          });
          setTimeout(() => {
            this.setState({ errorMessage: "" });
          }, 5000);
        } else {
          this.setState({
            errorMessage: "Server error",
          });
          setTimeout(() => {
            this.setState({ errorMessage: "" });
          }, 5000);
        }
      }
    } else {
      console.log("Username and password are required.");
    }
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
              title={<h5>Sign In</h5>}
              bordered="false"
            >
              <Form
                onFinish={this.handleSignIn}
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

                <Form.Item
                  className="username"
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

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                {this.state.errorMessage ? (
                  <p className="color text-danger font-semibold">
                    {this.state.errorMessage}
                  </p>
                ) : null}
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
                <p className="font-semibold text-muted">
                  Forgot Password?{" "}
                  <Link to="/forgot-password" className="text-dark font-bold">
                    Forgot Password
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
