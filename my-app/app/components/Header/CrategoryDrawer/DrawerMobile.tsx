"use client";
import { gql, useQuery } from "@apollo/client";
import { Drawer, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDrawerMobileStore } from "../../../store/zustand";
import Category from "./MainCategory";
import { CATEGORY_QUERY } from "../../../../graphql/queries";
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { MdKeyboardArrowRight } from "react-icons/md";
interface DecodedToken extends JwtPayload {
  userId: string;
}
interface Subcategory {
  name: string;
  subcategories?: Subcategory[];
}

export function DrawerMobile() {
  const { isOpen, closeCategoryDrawer } = useDrawerMobileStore();
  const { loading, error, data } = useQuery(CATEGORY_QUERY);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("");
  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      setDecodedToken(decoded);
    }
  }, []);
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Drawer
        placeholder={""}
        open={isOpen}
        onClose={closeCategoryDrawer}
        placement="left"
        size={350}
        className=" md:hidden  bg-[#f8f9fd]  overflow-y-auto"
        onPointerEnterCapture={""}
        onPointerLeaveCapture={""}
      >
        <div className=" px-2 py-3 flex items-center justify-center text-white bg-strongBeige  ">
          <Link
            href={`${decodedToken?.userId ? "/Collections/tunisie" : "/signin"}`}
            className="font-bold text-xl flex items-center gap-2 "
          >
            <FaUser />
            Bonjour
            {`${decodedToken?.userId ? "" : ",Identifiez-vous"}`}
          </Link>
          <IconButton
            placeholder={""}
            variant="text"
            color="blue-gray"
            onClick={closeCategoryDrawer}
            className="ml-auto"
            
            onPointerEnterCapture={""}
            onPointerLeaveCapture={""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        {data?.categories.length > 0 && (
          <Category
            data={data}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        {data?.categories.length <= 0 && (
          <p>
            Aucune catégorie disponible pour le moment. Veuillez revenir plus
            tard !
          </p>
        )}
        <div
          onClick={closeCategoryDrawer}
          className={`flex py-3 cursor-pointer focus:text-red-200 items-center justify-between  px-7 w-full border-b-2`}
        >
          <Link href={"/Collections/tunisie"} className="capitalize font-bold">
            Voir Tous
          </Link>
          <MdKeyboardArrowRight size={20} />
        </div>
      </Drawer>
    </>
  );
}
