import { router } from "./app.routes.jsx"
import { RouterProvider } from "react-router"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import InterviewContextProvider from "./features/interview/interview.context.jsx"

function App() {


  return (
    <>
      <AuthProvider>
        <InterviewContextProvider>
        <RouterProvider router={router} />
        </InterviewContextProvider>
      </AuthProvider>

    </>
  )
}

export default App
