import React from "react";

// Define the props for EmployeeCard
interface EmployeeCardProps {
  name: string;
  role: string;
  yearsWorked: number;
  backgroundColor: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  role,
  yearsWorked,
  backgroundColor,
}) => {
  return (
    <div className={`p-2 lg:w-1/3 md:w-1/2 w-full ${backgroundColor}`}>
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg relative group">
        {/* Profile Image */}
        <img
          alt={name}
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
          src="https://dummyimage.com/80x80"
        />
        {/* Profile Details */}
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">{name}</h2>
          <p className="text-gray-500">{role}</p>
          <p className="text-gray-600 text-sm">
            {yearsWorked} {yearsWorked === 1 ? "year" : "years"}
          </p>
        </div>
        {/* Hover Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-2">
          <button className="text-blue-500 hover:underline">Update</button>
          <button className="text-red-500 hover:underline">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
