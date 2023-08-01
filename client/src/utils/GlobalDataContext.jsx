import { createContext, useContext, useState } from "react";

// Create the GlobalDataContext
const GlobalDataContext = createContext();

// Create a custom hook to use the GlobalDataContext
export const useGlobalData = () => useContext(GlobalDataContext);

// Create the GlobalDataProvider component
export const GlobalDataProvider = ({ children }) => {
  // State to hold the global data
  const [globalData, setGlobalData] = useState(null);

  // Function to update the global data
  const updateGlobalData = (data) => {
    setGlobalData(data);
  };

  return (
    <GlobalDataContext.Provider value={{ globalData, updateGlobalData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};