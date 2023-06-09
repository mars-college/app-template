import { Divider } from "antd";
import React, {useContext} from "react";
import AppContext from 'context/AppContext'

import { useAccount } from "wagmi";

import EthereumAuth from "components/account/EthereumAuth";
import MannaManage from "components/account/MannaManage";

const AccountTab = () => {
  const { address, isConnected } = useAccount();
  const { isSignedIn, setIsSignedIn } = useContext(AppContext);

  const handleSignIn = (signedIn: boolean) => {
    setIsSignedIn(signedIn);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <>
      {isSignedIn ? (
        <div>
          <h3>Signed in as {address}</h3>
          <EthereumAuth onSignIn={handleSignIn} isButton={false} />
          <Divider />
          <MannaManage />
          <Divider />
        </div>
      ) : (
        <div>
          <p>Please sign-in to verify that you are the owner of this wallet.</p>
          <EthereumAuth onSignIn={handleSignIn} isButton={true} />
        </div>
      )}
    </>
  );
};

export default AccountTab;
