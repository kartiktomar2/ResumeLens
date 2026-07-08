import { useContext } from "react"
import { AuthContext } from "../auth.context.jsx"
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/api.auth.js"




export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const result = await loginUser({ email, password })
            setUser(result.data)
        } catch (error) {
              throw error
        }
        finally {

            setLoading(false)
        }
    }







    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const result = await registerUser({ username, email, password })
            setUser(result.data)
        } catch (error) {

        }
        finally {

            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser()
            setUser(null)
        } catch (error) {

        }
        finally {

            setLoading(false)
        }
    }


    return { user, loading, handleLogin, handleLogout, handleRegister }

}