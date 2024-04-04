/**
 * @author Darshit Dhameliya
 */
import React from 'react';
import { Menu, Grid } from 'antd';
import { Link, useLocation } from "react-router-dom";

const { useBreakpoint } = Grid;

/**
 * Navigation menu of Landing Page
 */
const MenuComponent = () => {
  const { md } = useBreakpoint()
  const location = useLocation();
  const isSignInPage = location.pathname === "/sign-in";
  const isSignUpPage = location.pathname === "/sign-up";

  return (
    <Menu mode={md ? "horizontal" : "inline"} disabledOverflow={true}>
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
            <Menu.Item key="5">
              <Link to="/sign-up">
                <span>Sign Up</span>
              </Link>
            </Menu.Item>
        ) : (
            isSignUpPage && (
              <Menu.Item key="6">
                <Link to="/sign-in">
                  <span>Sign In</span>
                </Link>
              </Menu.Item>
            )
        )}
        {!isSignInPage && !isSignUpPage && (
            <>
              <Menu.Item key="7">
                <Link to="/sign-up">
                  <span>Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/sign-in">
                  <span>Sign In</span>
                </Link>
              </Menu.Item>
            </>
        )}
    </Menu>
  );
}

export default MenuComponent;