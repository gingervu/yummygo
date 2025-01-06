import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = ({setShowLogin, setShowSignUp}) => {

  const [menu,setMenu] = useState("home"); //thay home bang menu thi thay dau gach chan o ben duoi menu

  // return (
  //   <div className='navbar'>
  //     <img src={assets.logo} alt="" className="logo" />
  //     {/* <p>Món ngon ở đâu cũng có</p> */}
  //     {/* <p>YUMMYGO</p> */}
  //     <ul className='navbar-menu'>
  //       <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
  //       <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
  //       <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li>
  //       <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li>
  //       </ul>    

  //       <div className='navbar-right'>
  //           <img src={assets.search_icon} alt=""/>
  //           <div className="navbar-search-icon">
  //               <img src={assets.basket_icon} alt=""/>
  //               <div className="dot"></div>
  //           </div>
  //           <button>Đăng nhập</button>
  //       </div>
  //   </div>
  // )
    return (
      <div className="navbar">
        <div className="navbar-left">
          <p className='yummygo'>YUMMYGO</p>
        </div>

        <div className="navbar-center">
          <p>Món ngon ở đâu cũng có</p>
          <button>Tìm món</button>

        </div>

        {/* <div className="navbar-right">
          <li onClick={()=>setShowLogin(true)} className={menu==="đăng ký"?"active":""}>đăng ký</li>
          <li onClick={()=>setShowLogin(true)} className={menu==="đăng nhập"?"active":""}>đăng nhập</li>
        </div> */}

        <div className="navbar-right">
          <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
          <button onClick={() => setShowSignUp(true)}>Đăng ký</button>

        </div>
      </div>

    )
}

export default Navbar
