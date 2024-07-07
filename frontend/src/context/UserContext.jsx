import React,{useContext,useState,createContext} from 'react'

const UserContext = createContext()


const UserProvider = ({children}) => {
    const [user,setUser] = useState(null)


    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext)

export {UserProvider,useUser}