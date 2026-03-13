import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-full h-fit md:h-screen mt-20 bg-cover bg-center max-sm:mt-18 max-sm:bg-none relative"
        style={{  
          backgroundImage: `url(${assets.coverImage})`,
        }}
      >
        <div className="p-20 flex flex-col gap-5 max-sm:h-[90%] h-[85%] justify-center max-sm:px-0 max-sm:py-5 max-sm:justify-start">
          <div className="max-sm:px-5 max-sm:bg-[#F2F0F1] flex gap-5 flex-col">
            <h1 className="text-4xl font-bold max-sm:text-3xl tracking-widest">
              FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
            </h1>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed <br /> to bring out your individuality and cater to your
              sense of style.
            </p>
            <div>
              <button
                onClick={() => navigate("/collection")}
                className="bg-black text-white px-10 py-2 rounded-full cursor-pointer max-sm:w-full"
              >
                Shop Now
              </button>
            </div>
            <div className="flex gap-5 max-sm:gap-2 flex-wrap">
              <div>
                <h3 className="text-4xl max-sm:text-3xl">200+</h3>
                <p>International Brands</p>
              </div>
              <div className="border-x max-sm:border-none max-sm:px-0 px-5 border-gray-300">
                <h3 className="text-4xl max-sm:text-3xl">2,000+</h3>
                <p>High Quality Products</p>
              </div>
              <div>
                <h3 className="text-4xl max-sm:text-3xl">3,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="sm:hidden pt-10 bg-[#F2F0F1]">
            <img className="h-full w-full object-cover" src={assets.coverImage2} alt="" />
          </div>
        </div>
        <div className="bg-black px-20 text-white flex justify-between max-sm:h-[10%] h-[15%] items-center flex-wrap max-sm:px-5 py-5 max-sm:gap-5 max-sm:justify-center absolute bottom-0 w-full z-10">
          <img
            src={assets.varsace}
            alt=""
            className="h-7 max-sm:h-6"
          />
          <img src={assets.zara} alt="" className="h-7 max-sm:h-6" />
          <img src={assets.gucci} alt="" className="h-7 max-sm:h-6" />
          <img src={assets.prada} alt="" className="h-7 max-sm:h-6" />
          <img src={assets.calvinKlein} alt="" className="h-7 max-sm:h-6" />
        </div>
      </div>
    </>
  );
};

export default Hero;
