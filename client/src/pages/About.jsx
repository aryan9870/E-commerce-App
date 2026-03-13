import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="pt-20 mx-20 text-gray-600">
      <div className="">
        <h1 className="text-center text-2xl my-10 font-semibold">
          <span className="text-gray-500">ABOUT</span> US
        </h1>
        <div className="flex items-center justify-center gap-10">
          <div className="w-1/2">
            <img className="w-3/4" src={assets.aboutImage} alt="" />
          </div>
          <div className="w-1/2 flex flex-col gap-5">
            <p>
              <b>ZEN VY</b> was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
            </p>
            <p>
              Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
            </p>
            <h4 className="font-semibold">Our Mission</h4>
            <p>
              Our mission at <b>ZEN VY</b> is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl my-10 font-semibold">
          <span className="text-gray-500">WHY</span> CHOOSE US
        </h3>
        <div className="flex">
          <div className="border border-gray-200 flex-1 flex align-center justify-center flex-col gap-5 h-[300px] p-10">
            <h4 className="font-semibold">Quality Assurance:</h4>
            <p>
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="border border-gray-200 flex-1 flex align-center justify-center flex-col gap-5 h-[300px] p-10">
            <h4 className="font-semibold">Convenience:</h4>
            <p>
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="border border-gray-200 flex-1 flex align-center justify-center flex-col gap-5 h-[300px] p-10">
            <h4 className="font-semibold">Exceptional Customer Service:</h4>
            <p>
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
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
            <button className="bg-black text-white py-2 px-5 rounded-r-full cursor-pointer">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
