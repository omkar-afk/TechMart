import React,{useContext,useState,createContext, useEffect} from 'react'
import  cookie  from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext()


const UserProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [jwt,setJwt] = useState(null);
    useEffect(() => {
        try{
            const token = cookie.get('token');
            setUser({...jwtDecode(token),jwt:token});
        }catch(e){
            setUser(null)
            console.log(e.message)
        }   
    }, [jwt]);

    return (
        <UserContext.Provider value={{user,setUser,setJwt}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => useContext(UserContext)

export {UserProvider,useUser}