"use client";
import React, { useState } from "react";
import Modal from "./modal";
import EmployeeForm from "../form/employee-form";

interface ModalBtnProps {
  userEmail: string | null;
  initialData?: {
    id?: string;
    name: string;
    department: string;
    years: string;
  };
}

const ModalBtn: React.FC<ModalBtnProps> = ({ userEmail, initialData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="border-gray-600 px-2 bg-purple-600 text-white hover:bg-purple-300 hover:text-purple-400 py-1 lg:py-2 lg:px-4 rounded-md"
        onClick={handleOpen}
      >
        {initialData ? "Edit Employee" : "Add Employee"}
      </button>
      <Modal
        title={initialData ? "Edit Employee" : "Add Employee"}
        description="Fill out the details below."
        isOpen={isOpen}
        onClose={handleClose}
      >
        <EmployeeForm
          action={initialData ? "update" : "create"}
          userEmail={userEmail}
          initialData={initialData}
        />
      </Modal>
    </>
  );
};

export default ModalBtn;
