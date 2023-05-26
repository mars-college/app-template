import React, { useState, useContext } from "react";
import type { AppProps } from "next/app";
import AppContext from "context/AppContext";
import "styles/globals.css";
import WalletProvider from "providers/WalletProvider";

function App({ Component, pageProps }: AppProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        isNewUser,
        setIsNewUser,
        username,
        setUsername,
      }}
    >
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </AppContext.Provider>
  );
}

export default App;
