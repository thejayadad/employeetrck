import React from "react";
import SignOut from "./signout";
import ModalBtn from "../button/modal-btn";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;
  
  return (
    <header className="w-full border-b">
      <div className="flex mx-auto max-w-screen-lg py-8 px-4 justify-between items-center">
        <span className="text-gray-600 text-xl lg:text-2xl font-extrabold">
          Roster<span className="text-purple-600">Relay</span>
        </span>
        <div className="flex items-center space-x-3">
          <ModalBtn userEmail={userEmail || ''} />
          <SignOut />
        </div>
      </div>
    </header>
  );
};

export default Header;
