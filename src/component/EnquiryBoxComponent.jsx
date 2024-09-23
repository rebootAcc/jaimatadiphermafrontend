import React from "react";

const EnquiryBoxComponent = () => {
  return (
    <div className="relative flex flex-col gap-4 xl:p-12 lg:p-8 sm:p-4  w-full opacity-100 rounded-lg bg-[#0047AD] justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
        style={{ backgroundImage: `url(/images/enquirybg.png)` }}
      ></div>
      <div className="w-full flex justify-center items-center ">
        <img src="/images/klip.svg" alt="" className="h-[3rem]" />
      </div>
      <form className="flex flex-col sm:gap-2 lg:gap-4 w-full relative ">
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Your Name
          </label>
          <input
            type="text"
            className="h-[4rem] px-2 rounded-md outline-none w-full bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Mobile Number
          </label>
          <input
            type="text"
            className="h-[4rem] px-2 rounded-md w-full bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Select Product Name
          </label>
          <input
            type="text"
            className="h-[4rem] px-2 rounded-md w-full bg-white "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="">
            Message
          </label>
          <input
            type="text"
            className="h-[4rem] px-2 rounded-md w-full bg-white "
          />
        </div>
        <button
          className=" w-full h-[4rem] lg:mt-5 bg-white flex justify-center items-center text-xl font-semibold rounded-md"
          type="submit"
        >
          Enquiry Now
        </button>
      </form>
    </div>
  );
};

export default EnquiryBoxComponent;
