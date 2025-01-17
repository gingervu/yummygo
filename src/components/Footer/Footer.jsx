import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <div className="footer-logo">
                        <img src={assets.logo} alt="" />
                    </div>

                    <p>
                        Địa chỉ: 132 Nguyễn Trãi, Thanh Xuân, Hà Nội
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.instagram_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        {/* <img src={assets.youtube_icon} alt="" /> */}
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in touch</h2>
                    <ul>
                        <li>0123-456-789</li>
                        <li>yummygoHUS@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                bla bla...
            </p>
        </div>
    )
}

export default Footer
