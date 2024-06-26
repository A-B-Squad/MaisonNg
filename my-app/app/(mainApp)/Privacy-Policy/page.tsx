import Breadcumb from "@/app/components/Breadcumb";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";
const PrivacyPolicy = dynamic(() => import("./Privacy-Policy"));

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description:
    "Consultez notre politique de confidentialité pour comprendre comment nous traitons vos données personnelles.",
};

const pagePricacyPolicy = () => {
  return (
    <div className="p-6">
      <Breadcumb
        pageName={"Politique de Confidentialité"}
        pageLink={"Privacy-Policy"}
      />

      <PrivacyPolicy />
    </div>
  );
};

export default pagePricacyPolicy;
