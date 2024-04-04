import React, { useState } from 'react';
import MenuComponent from './Menu'
import { Drawer, Button } from 'antd';
import "./Header.css";
import { Link } from 'react-router-dom';

/**
 * Navigation Menu of Landing Page
 */
const Header = () => {
	const [isDrawerVisible, updateDrawerVisibility ] = useState(false)

	const showDrawer = () => {
		updateDrawerVisibility(true);
	};

	const onClose = () => {
		updateDrawerVisibility(false);
	};
	
    return (
        <nav className="menuBar">
            <div className="logo">
                <Link to="/">
                    <h5>IssueStack</h5>
                </Link>
            </div>
            <div className="menuCon">
                <div className="leftMenu">
                    <MenuComponent />
                </div>
                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                    title="IssueStack"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={isDrawerVisible}
                >
                    <MenuComponent />
                </Drawer>
            </div>
        </nav>
    );
	
}

export default Header;