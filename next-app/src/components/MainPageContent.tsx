import { ConnectButton } from "@rainbow-me/rainbowkit";

import React, { useState, useContext, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Modal, theme } from "antd";
import type { MenuProps } from "antd";
import axios from "axios";
import { useAccount } from "wagmi";

import AppContext from "context/AppContext";

import Account from "components/account/Account";
import MannaBalance from "components/account/MannaBalance";

import LittleMartian from "components/LittleMartian";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const WelcomePage = () => {

  return (
    <Layout style={{ minHeight: "100vh", alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", minWidth: "50vh", maxHeight: "100vh", maxWidth: "100vw", textAlign: "center" }}>
        <div style={{ textAlign: "center" }}>
          <center>
            <a href="https://mars.college">
              <img src="logo192.png" style={{width: "75%"}}/>  
            </a>
            <h1>Welcome</h1>
            <div style={{color: "#666"}}>
              <h3>
                We're happy to have you.
              </h3>
            </div>
            <div style={{color: "#666"}}>
              <h3>To use the app, please connect your wallet.</h3>
              <div style={{ textAlign: "center", margin: "auto", width: "40%"}}>
                <ConnectButton />
              </div>
            </div>
          </center>
        </div>
      </div>
    </Layout>
  );
};


const ConnectedPage = () => {
  const { isNewUser, setIsNewUser } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {token: { colorBgContainer }} = theme.useToken();

  const items: MenuItem[] = [
    getItem('User', 'sub1', <UserOutlined rev={""}/>, [
      getItem('My account', '11'),
      getItem('Hello world', '12'),
      getItem('Martian', '13'),
    ]),
  ];
  

  const handleMenuClick = (e: any) => {
    setActiveItem(e.key);
  };

  // set to number 1 by default
  useEffect(() => {
    if (activeItem === null) {
      setActiveItem("1");
    }
  }, [activeItem]);

  return (
    <>
      <Modal
        title="Welcome"
        open={isNewUser}
        onOk={() => setIsNewUser(false)}
        onCancel={() => setIsNewUser(false)}
        okText="Amen"
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        A new traveler has arrived to Mars. You have been granted 1,000 Manna.
      </Modal>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <a href="https://eden.art">
          <center>
            <img src="logo192.png" style={{width: "66.6%", marginTop: "10px", marginBottom: "10px"}}/>
          </center>
        </a>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1", "sub2", "sub3"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ 
          padding: 16, 
          background: colorBgContainer, 
          marginLeft: "auto", 
          marginRight: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* <MannaBalance /> */}
          <ConnectButton />
        </Header>
        <Content
          style={{
            margin: "0 16px",
            padding: "16px",
            background: colorBgContainer,
          }}
        >
          {activeItem === "11" && <Account />}
          {activeItem === "12" && <>Hello world</>}
          {activeItem === "13" && <LittleMartian/>}
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </>
  );
};


const MainPageContent = () => {
  const { isConnected } = useAccount();
  const { setIsSignedIn } = useContext(AppContext);
  const [isMounted, setIsMounted] = useState(false);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setConnected(isConnected);
    }
  }, [isConnected, isMounted]);

  useEffect(() => {
    if (!isConnected) {
      axios.post("/api/logout");
      setIsSignedIn(false);
    }
  }, [isConnected]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {connected ? (
        <ConnectedPage />
      ) : (
        <WelcomePage />
      )}
    </Layout>
  );
};

export default MainPageContent;
