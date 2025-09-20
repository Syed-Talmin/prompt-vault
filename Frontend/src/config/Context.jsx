import { createContext, useState } from "react"

export const MyContext = createContext()

const Context = ({children}) => {
    const [user, setUser] = useState(null);
  return (
    <MyContext.Provider value={{user, setUser}}>
        {children}
    </MyContext.Provider>
  )
}

export default Context;