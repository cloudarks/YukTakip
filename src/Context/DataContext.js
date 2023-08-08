import React, { useState } from 'react'

export const DataContext = React.createContext();


export const DataContextProvider = ({ children }) => {

  
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{data,setData}}>
      {children}
    </DataContext.Provider>
  )
}

