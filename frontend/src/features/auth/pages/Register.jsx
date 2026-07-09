import { Link, replace, useNavigate, Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth.js"
import { useState } from "react"



function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, handleRegister, user } = useAuth();

    
    const navigate = useNavigate();
     function handleSubmit(e) {
        e.preventDefault();
        console.log("handle submit executed")
        if ((!email?.trim()) || (!password?.trim()) || (!username?.trim())) {
            console.log("condition called ")
            return;
        }

        handleRegister(username.trim(), email.trim(), password.trim());
       
    }


    return (
        <main>
            <div className="form-container">
                {
                    loading ? (
                        <main>Loading...</main>
                    ) : user? <Navigate to="/"/> : (
                        <>
                            <h1>Register</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        type="email" id="email" name='email' placeholder='Enter email address' />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                        type="text" id="username" name='username' placeholder='Enter Username' />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        type="password" id="password" name='password' placeholder='Enter password' />
                                </div>
                                <button className='button primary-button' >Register</button>
                            </form>
                            <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
                        </>
                    )
                }
            </div>
        </main>
    )
}

export default Register
