import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Form, Input, Card } from "antd";
import HeaderAuthentication from "../../components/layout/HeaderAuthentication";
import "../signin/SignIn.css"
import { message } from "antd";
import axios from 'axios';

const { Footer, Content } = Layout;
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      message: ""
    };

    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  handleForgotPassword = async (values) => {
    const { email } = values;
    if (email) {

      try{
        const response = await axios.post(`http://localhost:3001/user/forgotPassword`, {
          email: email,
        })

        if(response.status === 200){
          const responseData = response.data;
          this.setState({ message: responseData.message }, () => {
            setTimeout(() => {
              this.setState({ message: "" });
            }, 5000);

          });
        }
        
      }catch(error){
        // console.error("Server Error")
        if (error.response && error.response.status && (error.response.status === 404)) {
          this.setState({ errorMessage: "User not found" });
          setTimeout(() => {
            this.setState({ errorMessage: "" });
          }, 5000);
        } else {
          this.setState({ errorMessage: "Server Error" });
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
