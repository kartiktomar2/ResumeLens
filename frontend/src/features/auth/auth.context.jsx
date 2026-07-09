import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "./services/api.auth.js";





export const AuthContext= createContext(null)


export const AuthProvider=({children})=>{
          
        const [user, setUser]= useState(null)
        const [loading, setLoading]= useState(true)
        useEffect(()=>{
            
            async function getUser(){
                try {
                     const result= await getCurrentUser();
                     setUser(result.data)
                } catch (error) {
                      console.log("error in auth context provider to get current user: ", error)
                }
                finally{
                    setLoading(false)
                }
            }
            getUser()

        },[])
     
    return (
            <AuthContext   value={{user,setUser, loading, setLoading}} >
                {children}
            </AuthContext>
    )
}