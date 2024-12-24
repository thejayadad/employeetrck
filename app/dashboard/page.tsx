import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SearchBar from "@/components/form/searchbar";
import { prisma } from "@/lib/prisma";
import EmployeeCard from "@/components/card/employee-card";

interface DashboardPageProps {
  searchParams: { page?: string };
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("User not authenticated");
  }

  // Pagination parameters
  const currentPage = parseInt(searchParams.page || "1", 10);
  const itemsPerPage = 2;
  const offset = (currentPage - 1) * itemsPerPage;

  // Fetch employees for the current page
  const employees = await prisma.employee.findMany({
    where: { userEmail },
    skip: offset,
    take: itemsPerPage,
  });

  // Total employee count
  const totalEmployees = await prisma.employee.count({ where: { userEmail } });
  const totalPages = Math.ceil(totalEmployees / itemsPerPage);

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
                  userEmail={userEmail}
                />
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <a
                  key={i}
                  href={`?page=${i + 1}`}
                  className={`px-4 py-2 border rounded ${
                    i + 1 === currentPage
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
