import React from 'react'
import {Navigate} from "react-router";
import { useAuth } from '../hooks/useAuth.js';

const ProtectedRoutes = ({children}) => {
  
      const {user, loading }= useAuth();
  
  return (
    <> 
      {
           loading? (
               <main><h1>Loading...</h1></main>
           ): user? (children): (
            <Navigate to="/login" /> 
           )
      }
    </>
  )
}

export default ProtectedRoutes
