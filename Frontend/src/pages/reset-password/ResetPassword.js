import React, { Component } from "react";
import { Layout, Menu, Button, Form, Input, Card } from "antd";
import "../signin/SignIn.css";
import HeaderAuthentication from "../../components/layout/HeaderAuthentication";
import { message } from "antd";
import axios from 'axios';

const { Footer, Content } = Layout;

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPasswordError: "",
      errorMessage: "",
      message: "",
      token: null,
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const tokenIndex = url.indexOf("token=");
    if (tokenIndex !== -1) {
      const tokenStartIndex = tokenIndex + 6; 
      const tokenEndIndex = url.indexOf("&", tokenStartIndex);
      const token = tokenEndIndex !== -1
        ? url.substring(tokenStartIndex, tokenEndIndex)
        : url.substring(tokenStartIndex);
      this.setState({ token });
    }
  }

  handleResetPassword = async (values) => {
    const { password, confirmPassword } = values;
    console.log("confirmPassword", confirmPassword);

    console.log("password", password);
    if (password) {

      try{
        const response = await axios.post(`https://csci-5709-bk-assignment3.onrender.com/user/resetPassword`, {
          newPassword: password,
          resetToken: this.state.token
        })

        if(response.status === 200){
          const responseData = response.data;
          console.log("response", responseData);
          this.setState({ message: responseData.message }, () => {
            setTimeout(() => {
              this.props.history.push("/sign-in");
            }, 5000);
          });
        }
        
      }catch(error){
        console.error("Server Error")
        this.setState({ errorMessage: "Reset Password link is expired" });
        setTimeout(() => {
          this.setState({ errorMessage: "" });
        }, 5000);
    }

    } else {
      console.log("Password are required.");
    }

  };

  render() {
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const validatePassword = ({ getFieldValue }) => ({
      validator(_, value) {
        const passwordFieldValue = getFieldValue("password"); // Get the latest value of the password field
        if (!value || passwordFieldValue === value) {
          return Promise.resolve(); // Passwords match, resolve the Promise
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
                  className="password"
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
                  className="confirmPassword"
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
                {
                  (this.state.message !== null && this.state.message) ? (
                    <p className="font-semibold">
                      {this.state.message}
                    </p>
                  ) : (
                    this.state.errorMessage ? (
                      <p className="color text-danger font-semibold">
                        {this.state.errorMessage}
                      </p>
                    ) : (
                      null
                    )
                  )
                }
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
