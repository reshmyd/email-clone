import './Nav.scss'
import logo from '../../assets/images/Logo.png'
import user from '../../assets/images/User.png'
import downArrow from '../../assets/images/Down-Arrow.png'

const Nav = () => {
  return (
    <div className='nav'>
      <div className='logo'><img src={logo} alt="logo" />Relay<span>.io</span></div>
      <div className='user'><img src={user} alt="user" /><img src={downArrow} alt="down-arrow" className="down-arrow"/></div>
    </div>
  )
}

export default Nav