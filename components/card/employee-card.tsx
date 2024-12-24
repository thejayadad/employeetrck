"use client";
import React, { useState } from "react";
import { deleteClient } from "@/lib/action/delete-employee";
import EmployeeForm from "@/components/form/employee-form";
import Modal from "../button/modal";

interface EmployeeCardProps {
  id: string;
  name: string;
  role: string;
  yearsWorked: number;
  userEmail: string | null; // Add userEmail as a prop
}

// Helper function to determine background color based on years worked
const getBackgroundColor = (yearsWorked: number): string => {
  if (yearsWorked >= 1 && yearsWorked < 2) return "bg-yellow-100";
  if (yearsWorked >= 2 && yearsWorked < 4) return "bg-green-100";
  if (yearsWorked >= 4 && yearsWorked < 6) return "bg-blue-100";
  if (yearsWorked >= 6 && yearsWorked < 8) return "bg-purple-100";
  if (yearsWorked >= 8) return "bg-red-100";
  return "bg-gray-100"; // Default color
};

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  name,
  role,
  yearsWorked,
  userEmail,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backgroundColor = getBackgroundColor(yearsWorked);

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("id", id);
    deleteClient(formData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`p-2 lg:w-1/3 md:w-1/2 w-full ${backgroundColor}`}>
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg relative group">
        {/* Profile Details */}
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">{name}</h2>
          <p className="text-gray-500">{role}</p>
          <p className="text-gray-600 text-sm">{yearsWorked} years</p>
        </div>
        {/* Action Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={handleOpenModal}
          >
            Update
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title="Update Employee"
        description="Edit the employee details below."
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <EmployeeForm
          action="update"
          userEmail={userEmail} // Pass the userEmail here
          initialData={{
            id,
            name,
            department: role,
            years: yearsWorked.toString(),
          }}
        />
      </Modal>
    </div>
  );
};

export default EmployeeCard;
