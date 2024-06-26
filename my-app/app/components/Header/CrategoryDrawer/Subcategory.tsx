import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import prepRoute from "../../../Helpers/_prepRoute";
import Subsubcategory from "./Subsubcategory";

interface SubcategoryProps {
  subcategories: Subcategory[];
  backToMainCategory: (category: string) => void;
}

interface Subcategory {
  id: string;
  name: string;
  parentId: string;
  subcategories?: Subcategory[];
}

const Subcategory: React.FC<SubcategoryProps> = ({
  subcategories,
  backToMainCategory,
}) => {
  return (
    <>
      <div
        onClick={() => backToMainCategory("")}
        className="flex gap-3 hover:bg-[#f7f7f7] transition-all  cursor-pointer justify-around font-bold uppercase  items-center py-3"
      >
        <IoArrowBack size={25} />
        <p>Menu Principal</p>
      </div>

      {subcategories.map((subcategory: Subcategory, subIndex: number) => (
        <div key={subIndex} className="  h-fit  cursor-pointer">
          <Link
            href={`/Collections/tunisie/${prepRoute(subcategory.name)}/?category=${subcategory.id}`}
            className="py-1  pl-5 font-bold text-primaryColor hover:font-bold w-full block transition-colors  group border-b-2 cursor-pointer "
            data-parentcategory={subcategory.parentId}
          >
            {subcategory.name}
          </Link>

          {subcategory.subcategories &&
            subcategory.subcategories.length > 0 && (
              <Subsubcategory subsubcategories={subcategory.subcategories} />
            )}
        </div>
      ))}
    </>
  );
};

export default Subcategory;
