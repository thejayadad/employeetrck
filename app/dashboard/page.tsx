import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SearchBar from "@/components/form/searchbar";
import { prisma } from "@/lib/prisma";
import EmployeeCard from "@/components/card/employee-card";

const DashboardPage = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("User not authenticated");
  }

  const employees = await prisma.employee.findMany({
    where: { userEmail },
  });

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
                One stop location to track your employee administration needs.
              </p>
            </div>
            <div className="flex flex-wrap -m-2">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                id={employee.id}
                name={employee.name}
                role={employee.department}
                yearsWorked={parseInt(employee.years, 10)}
                userEmail={userEmail} // Pass userEmail here
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
