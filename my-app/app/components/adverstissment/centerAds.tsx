"use client";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { useQuery } from "@apollo/client";
import { ADVERTISSMENT_QUERY } from "../../../graphql/queries";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

const CenterAds = () => {
  const [showAds, setShowAds] = useState(false);
  const { data: centerAds, loading: loadingCenterAds } = useQuery(
    ADVERTISSMENT_QUERY,
    {
      variables: { position: "center_ads_product" },
    }
  );
  useEffect(() => {
    setTimeout(() => {
      setShowAds(true);
    }, 10000);
  }, []);
  return (
    <div className={`${showAds ? "opacity-100 block" : "opacity-0 hidden"} transition-all`}>
      <div className="bg-lightBlack absolute z-[60] left-0 top-0 w-full h-full"></div>
      <div
        className={` bg-white shadow-2xl flex items-center justify-center text-center w-[350px] h-[250px] md:w-[700px] md:h-[450px] fixed rounded-md  z-[60]  top-2/4 left-2/4 -translate-y-2/4  -translate-x-2/4 transition-all`}
      >
        <IoIosClose
          size={30}
          color="black"
          className="right-0 rounded-full w-8 h-8 absolute top-0 cursor-pointer"
          onClick={() => setShowAds(false)}
        />
        {centerAds?.advertismentByPosition.length === 0 ? (
          <>
            <p className="hidden md:block">700px x 450px</p>
            <p className="md:hidden block">300px x 250px</p>
          </>
        ) : (
          <Link href={`${process.env.BASE_URL_DOMAIN}/Collections/tunisie`}>
            <Image
              layout="fill"
              objectFit="contain"
              src={centerAds?.advertismentByPosition[0]?.images[0]}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CenterAds;