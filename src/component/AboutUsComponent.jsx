import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AboutUsComponent = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images and set flag once all images are loaded
  useEffect(() => {
    const imageUrls = [
      "/images/about4.jpg",
      "/images/about.jpg",
      "/images/about1.jpg",
    ];

    let loadedCount = 0;

    // Function to check when an image is loaded
    const imageLoaded = () => {
      loadedCount += 1;
      if (loadedCount === imageUrls.length) {
        setImagesLoaded(true); // All images are loaded
      }
    };

    // Preload all images
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = imageLoaded;
    });
  }, []);

  return (
    <div className="xl:p-16 lg:p-8 sm:p-4 ">
      <div className="flex sm:flex-col md:flex-row gap-6">
        <div className="lg:w-[45%] xl:w-[40%] md:w-[50%] sm:w-full">
          <div className="w-full flex flex-col gap-2">
            <div>
              <img
                src="/images/about4.jpg"
                alt="about us"
                className="w-full rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <img
                  src="/images/about.jpg"
                  alt="about us"
                  className="w-full rounded-md"
                />
              </div>
              <div>
                <img
                  src="/images/about1.jpg"
                  alt="about us"
                  className="w-full rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[55%] xl:w-[60%] md:w-[50%] sm:w-full flex flex-col sm:gap-4 md:gap-2 lg:gap-4 xl:gap-8">
          <h1 className="text-[#333333] font-semibold sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl xlg:text-3xl">
            About <span className="text-[#0047AD]">Jai Matadi Enterprise</span>
          </h1>
          <div className="flex flex-col gap-4 sm:text-base md:text-xs lg:text-sm xlg:text-lg xl:text-lg text-[#333333]">
            <p>
              Lorem ipsum dolor sit amet consectetur. Non et pellentesque et
              quam feugiat mi. Massa eu et fames eu adipiscing pellentesque ac
              quam posuere. Mauris cum felis pulvinar ac amet non nec. Enim
              donec volutpat elit rhoncus vitae suscipit libero. Tincidunt nec
              sit vestibulum tellus est malesuada. Pulvinar ac a hendrerit est
              ornare id. Pellentesque vulputate felis ultricies dolor turpis
              ipsum blandit blandit. Pellentesque volutpat justo accumsan
              vestibulum velit nibh tincidunt. Velit suscipit metus tincidunt
              morbi ut. Vitae eget facilisis nec vulputate tincidunt imperdiet
              tellus est
            </p>
            <p>
              Egestas magna mauris volutpat velit hendrerit morbi nibh lectus.
              Posuere mi enim gravida maecenas non venenatis amet enim ipsum.
              Sit a vulputate id dolor id. Adipiscing ut curabitur auctor rutrum
              praesent pretium amet ac diam. Libero volutpat facilisis auctor
              laoreet pretium tempus. Ac bibendum lobortis ultrices ut.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:gap-4 lg:gap-8 items-center  text-white">
            <Link
              to={"/ourproducts"}
              className="xl:h-[4rem] lg:h-[3.5rem] sm:h-[3rem] rounded-lg flex justify-center items-center bg-gradient-to-r from-[#0047AD] to-[#001D47] sm:text-sm lg:text-lg xl:text-xl font-semibold"
            >
              Our Products
            </Link>
            <Link
              to={"/contactus"}
              className="xl:h-[4rem] lg:h-[3.5rem]  sm:h-[3rem] rounded-lg flex justify-center items-center bg-gradient-to-r from-[#FF9900] to-[#995C00] sm:text-sm lg:text-lg xl:text-xl font-semibold"
            >
              Enquiry Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
