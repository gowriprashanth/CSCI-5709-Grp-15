import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer } from "antd";
import Sidenav from "./sidenav/Sidenav";
import Header from "./header/Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [sidenavType, setSidenavType] = useState("transparent");

  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout
      className="layout-dashboard"
    >
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key="left"
        width={250}
        className="drawer-sidebar"
      >
        <Layout
          className={`layout-dashboard`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav/>
      </Sider>
      <Layout>
        <AntHeader>
          <Header
            onPress={openDrawer}
            name={pathname}
            subName={pathname}
          />
        </AntHeader>
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
