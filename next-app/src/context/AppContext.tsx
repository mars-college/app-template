import { createContext } from 'react';

interface AppContextType {
  isSignedIn: boolean;
  setIsSignedIn: (signedIn: boolean) => void;
  isNewUser: boolean;
  setIsNewUser: (newUser: boolean) => void;
  username: string | null;
  setUsername: (username: string) => void;
}

const AppContext = createContext<AppContextType>({
  isSignedIn: false,
  setIsSignedIn: () => {},
  isNewUser: false,
  setIsNewUser: () => {},
  username: null,
  setUsername: () => {},
});

export default AppContext;
