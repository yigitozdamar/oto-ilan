import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="container h-full w-full flex flex-col mx-auto">
      <div className="flex w-full justify-center items-center mx-auto h-14 bg-neutral-400  text-white font-bold">
        OTO İLAN
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
