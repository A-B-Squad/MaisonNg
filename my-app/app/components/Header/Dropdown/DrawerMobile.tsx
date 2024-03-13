"use client";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export function DrawerMobile() {
  const [open, setOpen] = useState(
    window.localStorage.getItem("openDrawer") === "true"
  );

  const openDrawer = () => setOpen(true);
  console.log(open);

  const closeDrawer = () => {
    setOpen(false);
    window.localStorage.removeItem("openDrawer");
  };

  useEffect(() => {}, [open]);

  return (
    <>
      <Drawer
        placeholder={""}
        open={open}
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography placeholder={""} variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
          <IconButton
            placeholder={""}
            variant="text"
            color="blue-gray"
            onClick={() => setOpen(false)}
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
        <Typography
          placeholder={""}
          color="gray"
          className="mb-8 pr-4 font-normal"
        >
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
          <Button placeholder={""} size="sm" color="blue">
            Documentation
          </Button>
          <Button placeholder={""} size="sm" color="blue">
            Get Started
          </Button>
        </div>
      </Drawer>
    </>
  );
}
