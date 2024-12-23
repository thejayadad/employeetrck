"use client";
import React, { useState } from "react";
import Modal from "./modal";
import EmployeeForm from "../form/employee-form";

const ModalBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="border-gray-600 px-2 bg-purple-600 text-white hover:bg-purple-300 hover:text-purple-400 py-1 lg:py-2 lg:px-4 rounded-md"
        onClick={handleOpen}
      >
        ModalBTN
      </button>
      <Modal
        title="Stylish Modal"
        description="This is a reusable modal component with a smooth transition."
        isOpen={isOpen}
        onClose={handleClose}
      >
       <EmployeeForm />
      </Modal>
    </>
  );
};

export default ModalBtn;
