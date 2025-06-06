import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className='footer-content-left'>
                {/* <img src={assets.logo} alt="" /> */}
                <h1 style={{color:"tomato", fontSize:"50px",display:"flex"}}>Grub Hub</h1>
                {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo dolorem accusantium vitae distinctio, suscipit tempore commodi, facere ipsa recusandae, ea nihil quia incidunt animi! Laudantium dolorum culpa quasi veniam atque?
                Voluptas qui magnam neque doloribus non maiores sunt quam possimus a dignissimos beatae eius laborum tempore, ipsam sit velit rerum ipsum doloremque ducimus laboriosam quis molestiae placeat itaque libero. Placeat?</p> */}
                <p>Grubhub is a popular online food delivery service that connects users with local restaurants. Founded in 2025, it allows customers to browse menus, place orders, and have meals delivered to their doorstep. The platform partners with thousands of restaurants across cities, offering a wide range of cuisines. Users can order via the website or mobile app, track deliveries in real-time, and enjoy features like scheduled ordering and contactless delivery. Grubhub also provides subscription services like Grubhub+ for free deliveries and exclusive discounts. It supports various payment methods, making food delivery convenient and accessible for millions of users.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 9620000832</li>
                    <li>contact@grub-hub.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © Grubhub.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer