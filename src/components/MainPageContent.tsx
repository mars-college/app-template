import { ConnectButton } from "@rainbow-me/rainbowkit";

import React, { useState, useContext, useEffect } from "react";
import { ToolOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Modal, theme } from "antd";
import type { MenuProps } from "antd";
import axios from "axios";
import { useAccount } from "wagmi";

import AppContext from "context/AppContext";

import Account from "components/account/Account";
import MannaBalance from "components/account/MannaBalance";
// import Profile from "components/Profile";
// import Uploader from "components/Uploader";
// import CharacterBuilder from "components/CharacterBuilder";
// import Voice2Image from "components/Voice2Image";
// import GeneratorInterface from "components/GeneratorInterface";

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
            <a href="https://eden.art">
              <img src="logo192.png" style={{width: "75%"}}/>  
            </a>
            <h1>Welcome to Eden</h1>
            <div style={{color: "#666"}}>
              <h3>
                To learn more about Eden, visit <a href="https://eden.art">the homepage</a>.
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
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('My account', '11'),
      getItem('My creations', '12'),
    ]),    
    getItem("Apps", "sub2", <ToolOutlined />, [
      getItem('Voice2Image', '21'),
      getItem('Uploader', '22'),
      getItem('Character Builder', '23'),
    ]),
    getItem("Generators", "sub3", <ToolOutlined />, [
      getItem("Create", "31"),
      getItem("Interpolate", "32"),
      getItem("Real2Real", "33"),
      getItem("Remix", "34"),
      getItem("Interrogate", "35"),
      getItem("Lora train", "36"),
      getItem("TTS", "37"),
      getItem("Wav2Lip", "38"),
      getItem("Complete", "39"),
    ])
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
        A new traveler has arrived to Eden. You have been granted 1,000 Manna. Welcome to the Garden of Artificial Delights!
      </Modal>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <a href="https://eden.art">
          <center>
            <img src="logo192.png" style={{width: "66.6%"}}/>
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
          {/*{activeItem === "12" && <Profile />}
          {activeItem === "21" && <Voice2Image />}
          {activeItem === "22" && <Uploader />}
          {activeItem === "23" && <CharacterBuilder />}

          {activeItem === "31" && (
            <GeneratorInterface mediaType="image" generatorName="create" />
          )}
          {activeItem === "32" && (
            <GeneratorInterface mediaType="video" generatorName="interpolate" />
          )}
          {activeItem === "33" && (
            <GeneratorInterface mediaType="video" generatorName="real2real" />
          )}
          {activeItem === "34" && (
            <GeneratorInterface mediaType="image" generatorName="remix" />
          )}
          {activeItem === "35" && (
            <GeneratorInterface mediaType="text" generatorName="interrogate" />
          )}
          {activeItem === "36" && (
            <GeneratorInterface mediaType="lora" generatorName="lora" />
          )}
          {activeItem === "37" && (
            <GeneratorInterface mediaType="audio" generatorName="tts" />
          )}
          {activeItem === "38" && (
            <GeneratorInterface mediaType="video" generatorName="wav2lip" />
          )}
          {activeItem === "39" && (
            <GeneratorInterface mediaType="text" generatorName="complete" />
          )} */}
          hello world
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
