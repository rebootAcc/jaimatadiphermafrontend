import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const socialmedia = [
    {
      name: "/images/facebook.svg",
      link: "",
    },
    { name: "/images/instagram.svg", link: "" },
    {
      name: "/images/linkedin.svg",
      link: "",
    },
    { name: "/images/youtube.svg", link: "" },
  ];
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/categories/get`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/ourproducts?category=${encodeURIComponent(categoryName)}`);
  };
  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();

    const encodedMessage = encodeURIComponent(`Query: ${query}`);
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=919434072559&text=${encodedMessage}`
      : `https://api.whatsapp.com/send?phone=919434072559&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    getCategories();
  }, []);
  const quicklink = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Our Products", link: "/ourproducts" },
    { name: "Our Vision", link: "/ourvission" },
    { name: "Our Gallery", link: "" },

    { name: "Contact Us", link: "/contactus" },
  ];
  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 bg-[#F1F1F1] flex flex-col gap-4">
      <div className="flex sm:flex-col lg:flex-row sm:gap-8 lg:gap-5 xl:gap-8">
        <div className="lg:w-[35%] sm:w-full flex flex-col gap-6">
          <div className="">
            <img
              src="/images/jaimatadilogo.png"
              alt=""
              className="xl:h-[3rem] sm:h-[2.5rem] lg:h-[2rem]"
            />
          </div>
          <div className="flex flex-col gap-4 sm:text-base lg:text-sm xlg:text-lg xl:text-lg text-[#333333] font-medium">
            <div className="flex items-center gap-2">
              <h1 className="xlg:text-2xl lg:text-lg sm:text-xl font-semibold">
                Contact Info
              </h1>
              <div className="xl:w-[8rem] sm:w-[6rem]  h-[1px] bg-[#0047AD]"></div>
            </div>
            <div className="flex flex-row gap-2">
              <FaLocationDot className="text-[#0047AD] mt-1" />
              Vivekananda Rd, Ward No.- 8, Khalpara, Siliguri, West Bengal
              734005
            </div>
            <div className="flex flex-row gap-2">
              <MdEmail className="text-[#0047AD] mt-1" />
              jaimatadienterpriseslg@gmail.com
            </div>
            <div className="flex flex-row gap-2">
              <BiSolidPhoneCall className="text-[#0047AD] mt-1" />
              +91 9434072559
            </div>
            <span className="flex sm:gap-4 lg:gap-2 xl:gap-6 items-center">
              {socialmedia.map((social, index) => (
                <div key={index} className=" ">
                  <Link to={social.link}>
                    <img
                      src={social.name}
                      alt=""
                      className="xl:h-[1.5rem] sm:h-[1.4rem] lg:h-[1.2rem]"
                    />
                  </Link>
                </div>
              ))}
            </span>
          </div>
        </div>
        <div className="flex sm:w-full lg:w-[20%] flex-col sm:gap-6 lg:gap-4 xl:gap-8">
          <div className="flex ">
            <span className="xl:text-2xl lg:text-xl xlg:text-2xl sm:text-2xl text-[#0047AD] font-semibold">
              Quick Links
            </span>
          </div>

          <div className="flex flex-col sm:gap-4 xl:gap-4 sm:text-sm md:text-base xlg:text-base">
            {quicklink.map((service, index) => (
              <Link
                to={service.link}
                className="flex flex-row gap-2 font-medium items-center"
                key={index}
              >
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>{service.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex sm:w-full lg:w-[20%] flex-col sm:gap-6 lg:gap-4 xl:gap-8">
          <div className="flex ">
            <span className="xl:text-2xl lg:text-xl xlg:text-2xl sm:text-2xl text-[#0047AD] font-semibold">
              Our Category
            </span>
          </div>

          <div className="flex flex-col sm:gap-4 xl:gap-4 sm:text-sm md:text-base  xlg:text-base">
            {categories.slice(0, 6).map((category, index) => (
              <button
                onClick={() => handleCategoryClick(category.categoryName)}
                className="flex flex-row gap-2 font-medium items-center"
                key={index}
              >
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>{category.categoryName}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex sm:w-full lg:w-[25%] flex-col gap-4">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14256.380009881912!2d88.4251498!3d26.7094118!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441693048af99%3A0x1e6947765d6e2a15!2sJai%20Matadi%20Enterprise!5e0!3m2!1sen!2sin!4v1727548193942!5m2!1sen!2sin"
              className="rounded-lg w-full sm:h-[10rem] lg:h-[8rem] xlg:h-[10rem]"
              loading="lazy"
            ></iframe>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Your Queries..."
                className="bg-transparent sm:h-[3.5rem] lg:h-[3rem] xl:h-[3.5rem] w-full px-2 border border-[#cccccc] text-[#666666] rounded-lg"
              />
            </div>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-[70%] flex justify-center items-center sm:h-[3rem] lg:h-[2.5rem] xl:h-[3rem] lg:text-lg sm:text-xl xl:text-2xl font-semibold bg-[#0047AD] rounded-lg text-white"
            >
              Trade Enquiry
            </button>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t-2 border-[#cccccc] ">
        <div className="flex sm:flex-col lg:flex-row sm:gap-4 lg:gap-0 text-center items-center justify-between text-[#666666]">
          <span>
            Copyright 2024
            <Link to={"/"} className="font-bold text-[#0047AD] ml-2 mr-2">
              Jai Matadi Enterprise
            </Link>
            | All Rights Reserved. Privacy Policy
          </span>
          <span>
            Developed By:
            <Link
              to={"https://rebootmarketing.in/"}
              className="ml-2 font-bold text-[#0047AD]"
              target="_blank"
            >
              Reboot Marketing Pvt. Ltd.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
