import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import ProtectedRoutes from "./features/auth/components/ProtectedRoutes.jsx"
import Home from "./features/interview/pages/Home.jsx"
import Interview from "./features/interview/pages/Interview.jsx"

export const router= createBrowserRouter([
       {
            path:"/",
           element: <ProtectedRoutes><Home/> </ProtectedRoutes>
       },
      {
           path:"/login",
           element:<Login/>
      },
      {
          path:"/register",
          element:<Register/>
      },
      {
          path:"/interview/:interviewId",
           element: <ProtectedRoutes><Interview/> </ProtectedRoutes>
      }

])