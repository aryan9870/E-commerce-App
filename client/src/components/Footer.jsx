import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-20 px-20 pb-10 max-sm:p-5 bg-gray-200 mt-10 max-sm:mt-5 tracking-widest">
      <div className="flex justify-between flex-wrap gap-10 max-sm:flex-col">
        <div className="flex-2 flex flex-col gap-5">
          <Link to="/" className="text-4xl font-bold cursor-pointer">ZEN VY</Link>
          <Link to="/" className="text-gray-500 cursor-pointer">
            We have clothes that suit every style <br /> and occasion. Shop now
            and experience the <br /> ultimate shopping experience!
          </Link>
          <div className="flex gap-5 text-2xl">
            <Link target="_blank" to="https://github.com/aryan9870"><FaGithubSquare className="cursor-pointer" /></Link>
            <Link target="_blank" to="https://facebook.com"><FaFacebookSquare className="cursor-pointer" /></Link>
            <Link target="_blank" to="https://www.linkedin.com/in/aryan-singh-dev01/"><FaLinkedin className="cursor-pointer" /></Link>
            <Link target="_blank" to="https://www.instagram.com/ary_an__04/"><FaInstagramSquare className="cursor-pointer" /></Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-semibold">COMPANY</h3>
          <ul className="flex flex-col gap-5 text-gray-500">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-semibold">HELP</h3>
          <ul className="flex flex-col gap-5 text-gray-500">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-semibold">FAQ</h3>
          <ul className="flex flex-col gap-5 text-gray-500">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h3 className="font-semibold">RESOURCES</h3>
          <ul className="flex flex-col gap-5 text-gray-500">
            <li>Free eBooks</li>
            <li>Articles</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-200 pt-5 mt-5 border-t border-gray-300">
        <p className="text-gray-500 text-center">
          © 2026 ZenVy. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
