import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"
import './login.css'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()
  const onLogin = async () => {
    try {
      const response = await api.login({username, password})
      window.localStorage.setItem('userLogin', JSON.stringify(response.data))
      window.localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (e) {
      alert(e.response?.data?.message)
    }
  }
  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <span className="logo">Booking</span>
          <div className="navItems">
            <button onClick={() => {navigate('/signup')}} className="navButton">Sign up</button>
            <button onClick={() => {navigate('/login')}} className="navButton">Login</button>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <div className="d-flex justify-content-center align-items-center mb-4"> 
          <h3>Login</h3>
        </div>
        <div className='d-flex flex-column gap-3 justify-content-center align-items-center'>
          <input value={username} onChange={(e) => {setUsername(e.target.value)}} className='py-3 inputEle' type='email' placeholder="Email" />
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} className='py-3 inputEle' type='password' placeholder='Password' />
          <div onClick={onLogin} className='btn border btnLog-color inputEle'>Login</div>
        </div>
      
      </div>
    </div>
  )
}
 
export default Login