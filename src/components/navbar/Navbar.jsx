import React from "react"
import { useNavigate } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  const [userLogin, setUser] = React.useState(null)

  React.useEffect(() => {
    const userCurrentLogin = JSON.parse(window.localStorage.getItem('userLogin'))
    if (userCurrentLogin) {
      setUser(userCurrentLogin)
    }
  }, [])

  const navigate = useNavigate()
  const onLogout = () => {
    window.localStorage.removeItem('userLogin')
    setUser(null)

  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
          {!!userLogin && (
            <>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <div>{userLogin.user.username}</div>
                  <button onClick={() => {navigate('/transaction')}} className="navButton">Transactions</button>
                  <button onClick={onLogout} className="navButton">Logout</button>
                </div>
            </>
            )
          }
          {!userLogin && (
            <>
              <div className="navItems">
                <button onClick={() => {navigate('/signup')}} className="navButton">Register</button>
                <button onClick={() => {navigate('/login')}} className="navButton">Login</button>
                </div>
            </>
          )}
          
      </div>
    </div>
  )
}

export default Navbar
