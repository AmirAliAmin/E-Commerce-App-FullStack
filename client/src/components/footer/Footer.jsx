import React from "react";
import Policy from "./Policy";
import { FaRegMessage } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { LuYoutube } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { FaPinterestP } from "react-icons/fa";

function Footer() {
  return (
    <div className="container py-6">
      <Policy />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-[1fr_2fr_1fr] py-4 border-b border-gray-200">
        <div className="border-r border-gray-300">
          <h1 className="text-xl  font-bold mb-5">Contact us</h1>
          <p className="text-sm text-gray-700">Classyshop - Mega Super Store</p>
          <p className="text-sm text-gray-700">507-Union Trade Centre France</p>
          <div className="space-y-2 mt-3">
            <p className="link text-sm">sales@yourcompany.com</p>
            <h1 className="text-primary text-lg font-medium">(+91) 9876-543-210</h1>
            <div className="flex gap-2 items-center w-50 ">
              <FaRegMessage className="text-5xl text-primary"/>
              <p className="text-lg font-medium">Online Chat Get Expert Help</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-10 px-4 border-r border-gray-300">
          <div>
            <h1 className="text-xl  font-bold mb-5">Product</h1>
            <ul className="space-y-2">
              <li className="link text-sm">Prices drop</li>
              <li className="link text-sm">New products</li>
              <li className="link text-sm">Best sales</li>
              <li className="link text-sm">Contact us</li>
              <li className="link text-sm">Sitemap</li>
              <li className="link text-sm">Stores</li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl  font-bold mb-5">Our company</h1>
            <ul className="space-y-2">
              <li className="link text-sm">Delivery</li>
              <li className="link text-sm">Legal Notice</li>
              <li className="link text-sm">Terms and conditions of use</li>
              <li className="link text-sm">About us</li>
              <li className="link text-sm">Secure payment</li>
              <li className="link text-sm">Login</li>
            </ul>
          </div>
        </div>
        <div className="px-4">
          <h1 className="text-xl  font-bold mb-5">Subscribe to newsletter</h1>
          <p className="text-gray-700 text-sm">Subscribe to our latest newsletter to get news about special discounts.</p>
          <div className="mt-10">
            <input type="email" placeholder="Your Email Address" className="outline-none border w-full py-1 border-gray-400 pl-3" />
            <button className="bg-primary uppercase py-2 px-5 rounded-lg text-white mt-3">Subscribe</button>
          </div>
          </div>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-between gap-5  items-center">
        <div className="flex gap-2 items-center ">
          <div className="w-8 h-8 flex items-center rounded-full justify-center hover:bg-primary hover:text-white  cursor-pointer">
          <FaFacebookF className="text-lg"/>
          </div>
          <div className="w-8 h-8 flex items-center rounded-full justify-center hover:bg-primary hover:text-white  cursor-pointer">
          <LuYoutube className="text-xl"/>  
          </div>
          <div className="w-8 h-8 flex items-center rounded-full justify-center hover:bg-primary hover:text-white  cursor-pointer">
          <FaInstagram className="text-xl"/>
          </div>
          <div className="w-8 h-8 flex items-center rounded-full justify-center hover:bg-primary hover:text-white  cursor-pointer">
          <FaPinterestP className="text-xl"/>
          </div>
        </div>
        <div>
          <p className="text-center">© 2024 - Ecommerce Template</p>
        </div>
        <div className="flex">
          <img src={assets.mastercard} alt="" />
          <img src={assets.aamerican_express} alt="" />
          <img src={assets.visa} alt="" />
          <img src={assets.carte_bleue} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
