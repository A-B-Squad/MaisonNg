import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React from "react";
import "../../app/globals.css";
import { ApolloWrapper } from "../../lib/apollo-wrapper";
import BasketDrawer from "../components/BasketDrawer";
import { DrawerMobile } from "../components/Header/CrategoryDrawer/DrawerMobile";
import Header from "../components/Header/Header";

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const roboto = Roboto({
  weight: ["100","300","400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <DrawerMobile />
        <BasketDrawer />

        <Header />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
