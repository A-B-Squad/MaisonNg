import Link from "next/link";
import React from "react";
import { MdOutlineArrowRight } from "react-icons/md";
import prepRoute from "../../_prepRoute";

interface Subcategory {
  id: string;
  name: string;
}

interface SubsubcategoryProps {
  subsubcategories: Subcategory[];
}

const Subsubcategory: React.FC<SubsubcategoryProps> = ({
  subsubcategories,
}) => {
  return (
    <>
      {subsubcategories?.map((subsubcategory, subIndex) => (
        <Link
          href={`/Collections/${prepRoute(subsubcategory.name)}/tunisie?category=${subsubcategory.id}`}
          className="py-1 pl-5 group text-sm cursor-pointer transition-all relative  left-2 flex hover:font-bold  "
          key={subIndex}
        >
          <MdOutlineArrowRight className="text-xl transition-all" />
          {subsubcategory.name}
        </Link>
      ))}
    </>
  );
};

export default Subsubcategory;
