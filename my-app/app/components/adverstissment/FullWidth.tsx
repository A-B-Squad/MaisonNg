"use client";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { IoImageOutline } from "react-icons/io5";
import Image from "next/legacy/image";
const FullWidthAds = ({
  FullAdsLoaded,
  FullImageAds,
}: {
  FullAdsLoaded: Boolean;
  FullImageAds: string;
}) => {
  return (
    <>
      {FullAdsLoaded && (
        <div className="grid relative animate-pulse w-full h-52 mt-12  place-items-center rounded-lg bg-mediumBeige ">
          <IoImageOutline className="h-12 w-12 text-gray-500" />
        </div>
      )}

      {!FullAdsLoaded && !FullImageAds && (
        <div className="rounded-xl relative w-full h-52 mt-12 bg-mediumBeige flex flex-col justify-center items-center ">
          <p>{"Full Ads"}</p>
          <p>180px x 960px</p>
        </div>
      )}

      {FullImageAds && !FullAdsLoaded && (
        <div className=" md:my-8  w-full relative h-[85px] md:h-[200px]   ">
          <Image
            className=" h-[85px] md:h-[200px]"
            src={FullImageAds}
            layout="fill"
            objectFit="fill"
            loading="eager"
            alt="adsFullWidth"
          />
        </div>
      )}
    </>
  );
};

export default FullWidthAds;
