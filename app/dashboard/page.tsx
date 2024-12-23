import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SearchBar from "@/components/form/searchbar";
import EmployeeCard from "@/components/card/employee-card";

// Define the Employee type
type Employee = {
  name: string;
  role: string;
  yearsWorked: number;
};

// Helper function to determine background color based on years worked
const getBackgroundColor = (years: number): string => {
  if (years >= 1 && years < 2) return "bg-yellow-100";
  if (years >= 2 && years < 4) return "bg-green-100";
  if (years >= 4 && years < 6) return "bg-blue-100";
  if (years >= 6 && years < 8) return "bg-purple-100";
  if (years >= 8) return "bg-red-100";
  return "bg-gray-100"; // Default color
};

// Example employee data
const employees: Employee[] = [
  { name: "Holden Caulfield", role: "UI Designer", yearsWorked: 3 },
  { name: "Jane Doe", role: "Backend Developer", yearsWorked: 6 },
  { name: "John Smith", role: "Frontend Developer", yearsWorked: 10 },
];

const DashboardPage = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col mx-auto max-w-screen-lg px-4 py-8">
        <SearchBar />
        <div className="w-full bg-gray-50 rounded-lg p-4 mt-6">
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                RosterRelay
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                One stop location to track your employee Administration needs.
              </p>
            </div>
            <div className="flex flex-wrap -m-2">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.name}
                  name={employee.name}
                  role={employee.role}
                  yearsWorked={employee.yearsWorked}
                  backgroundColor={getBackgroundColor(employee.yearsWorked)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
