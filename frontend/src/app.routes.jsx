import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import ProtectedRoutes from "./features/auth/components/ProtectedRoutes.jsx"

export const router= createBrowserRouter([
       {
            path:"/",
           element: <ProtectedRoutes><h1>HOME PAGE </h1></ProtectedRoutes>
       },
      {
           path:"/login",
           element:<Login/>
      },
      {
          path:"/register",
          element:<Register/>
      }

])