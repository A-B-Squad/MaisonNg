import React from "react";
import { CiHome } from "react-icons/ci";
import { LuPackage2 } from "react-icons/lu";
import { TbPackages } from "react-icons/tb";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { FaRegChartBar } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="flex flex-no-wrap h-screen float-left z-50 fixed top-0 left-0">
      <div className="w-64 absolute sm:relative bg-strongBeige  shadow md:h-full flex-col justify-between hidden sm:flex">
        <div>
          <ul className="mt-4">
            <li
              className="flex w-full py-4 px-8 justify-between text-white cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <IoMenu size={30} />
                <span className="text-lg ml-2">MaisonNg</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <CiHome size={24} className="font-bold" />
                <span className="text-md ml-2">Tableau de bord</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <LuPackage2 size={24} />
                <span className="text-md ml-2">Commandes</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <TbPackages size={24} />
                <span className="text-md ml-2">Poduits</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <MdKeyboardDoubleArrowUp size={24} />

                <span className="text-md ml-2">Up Sells</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <LuUsers2 size={24} />
                <span className="text-md ml-2">Clients</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <FaRegChartBar size={24} />
                <span className="text-md ml-2">Statistiques</span>
              </a>
            </li>
            <li
              className="flex w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <LuNewspaper size={24} />
                <span className="text-md ml-2">Factures</span>
              </a>
            </li>
            <li
              className="flex absolute bottom-0 w-full py-4 px-8 justify-between text-white rounded-l-full hover:text-strongBeige
             hover:bg-gray-100  cursor-pointer items-center transition"
            >
              <a
                href="javascript:void(0)"
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
              >
                <CiSettings size={24} />
                <span className="text-md ml-2">Réglages</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
