import React from 'react'
import {Navigate} from "react-router";
import { useAuth } from '../hooks/useAuth.js';
import "../auth.form.scss"

const ProtectedRoutes = ({children}) => {
  
      const {user, loading }= useAuth();
  
  return (
    <> 
      {
           loading? (
               <main>
                  <div className="auth-loader" role="status" aria-live="polite">
                    <span className="auth-loader__spinner" aria-hidden="true" />
                    <span className="auth-loader__text">Loading</span>
                  </div>
               </main>
           ): user? (children): (
            <Navigate to="/login" /> 
           )
      }
    </>
  )
}

export default ProtectedRoutes
