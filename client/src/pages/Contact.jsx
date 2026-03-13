import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="pt-20 mx-20 text-gray-600 tracking-wider">
      <div className="">
        <h1 className="text-center text-2xl my-10 font-semibold">
          <span className="text-gray-400">CONTACT</span> US
        </h1>
        <div className="flex items-center justify-center gap-10">
          <div className="w-1/2 flex items-center justify-end">
            <img className="w-2/3" src={assets.contactImage} alt="" />
          </div>
          <div className="w-1/2 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Our Store</h3>
              <p>123 Main Street, City, Country</p>
              <div>
                <p>Tel: (415) 555‑0132</p>
                <p>Mail: info@zenvy.com</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Working Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 flex justify-center items-center flex-col gap-5">
        <h4 className="font-semibold">Subscribe now & get 20% off</h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div>
          <div className="flex gap-2 items-center bg-gray-200 rounded-full shadow-sm max-xl:hidden">
            <input
              className="w-full bg-transparent outline-none py-2 px-5"
              type="email"
              placeholder="Enter your email"
            />
            <button className="bg-black text-white py-2 px-5 rounded-r-full cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
