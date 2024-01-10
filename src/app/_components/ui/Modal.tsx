"use client";
import React, { createContext, useState } from "react";
import { MdSettings } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
interface modalContext {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
export const modalContext = createContext<modalContext>({});

interface modalWrapperProps {
  variant?: string;
  auto: boolean;
  children: React.ReactNode;
  value?: any;
  component?: any;
  title?: string;
  size?: string;
  card?: any;
  isOpen?:boolean
  setIsOpen?:(value:boolean) => void
}

const Modal: React.FC<modalWrapperProps> = ({
  variant,
  value,
  size = "sm",
  title,
  children,
  auto,
  isOpen,
  setIsOpen,
}) => {
  const onOpen = () => setIsOpen?.(true);
  const onClose = () => setIsOpen?.(false);
  const sizesMap = new Map();

  sizesMap.set("sm", {w:"w-[350px]", h:'auto', maxH:'[650px]'});
  sizesMap.set("md", {w:"w-[450px]", h:'auto', maxH:'[650px]'});
  sizesMap.set("lg", {w:"w-[550px]", h:'auto', maxH:'[650px]'});
  sizesMap.set("xl", {w:"w-[650px]", h:'auto', maxH:'[70vh]'});
  sizesMap.set("full", {w:"w-[100vw]", h:'[100vh]', maxH:'[100vh]'});


  return (
    <>
      {auto ? (
        ''
      ) : (
        <button className={`${variant}`} onClick={onOpen}>
          {value}
        </button>
      )}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed left-0 top-0 z-30 flex h-[100vh] w-[100vw] items-center justify-center`}
      >
        <div
          className="left-0 top-0 h-[100vh] w-[100vw] z-30  bg-black/75 "
          onClick={onClose}
        ></div>
        <div className="fixed z-50 flex h-full w-full items-center justify-center">
          <div
            className={` fixed z-50 ${sizesMap.get (size).w}  max-h-[70vh] overflow-y-auto rounded-md dark:bg-navy bg-white px-6 py-3`}
          >
            <div className="flex w-full items-center justify-between py-4">
             {title ?  <p className="text-md font-semibold text-darkGray dark:text-white ">{title}</p> :''}
              <RxCross1
                className="text-mediumGray hover:scale-105"
                onClick={onClose}
              />
            </div>
            <div className="flex h-auto w-full flex-col">
              <modalContext.Provider value={{ onClose }}>
                {children}
              </modalContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;