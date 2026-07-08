import React, {  useState } from 'react'
import { Link, useNavigate } from "react-router"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth.js"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loading, handleLogin } = useAuth()

    const navigate= useNavigate()
    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log("submit called ")
        if ((!email?.trim() === "") || (!password?.trim() === "")) {
            console.log("condition called")
           
            return;
        }
       await  handleLogin(email,password); //The promise returned by this function will be marked as resolved when the finally statement gets executed.
       navigate("/")

       


    }
      if(loading)
      {
            return (
                  <main>Loading...</main>
            )
      }

    
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login
