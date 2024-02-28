import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./HeaderAuthentication.css";

const HeaderAuthentication = () => {
  const { Header } = Layout;
  const location = useLocation();
  const isSignInPage = location.pathname === "/sign-in";
  const isSignUpPage = location.pathname === "/sign-up";

  return (
    <Header>
      <div className="header-col header-brand">
        <Link to="/">
          <h5>IssueStack</h5>
        </Link>
      </div>
      <div className="header-col header-nav ">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <a href="/#features">
              <span>Features</span>
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/#about">
              <span>About</span>
            </a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/#contact">
              <span>Contact</span>
            </a>
          </Menu.Item>
          <Menu.Item key="4">
            <a href="/#faqs">
              <span>FAQ</span>
            </a>
          </Menu.Item>
          {isSignInPage ? (
            <Menu.Item key="4">
              <Link to="/sign-up">
                <span>Sign Up</span>
              </Link>
            </Menu.Item>
          ) : (
            isSignUpPage && (
              <Menu.Item key="4">
                <Link to="/sign-in">
                  <span>Sign In</span>
                </Link>
              </Menu.Item>
            )
          )}
          {!isSignInPage && !isSignUpPage && (
            <>
              <Menu.Item key="4">
                <Link to="/sign-up">
                  <span>Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sign-in">
                  <span>Sign In</span>
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderAuthentication;
