import React from "react";
import { auth } from "@/auth";
import Search from "@/components/form/search";
import { prisma } from "@/lib/prisma";
import EmployeeCard from "@/components/card/employee-card";

interface DashboardPageProps {
  searchParams: Promise<{ query?: string; page?: string; limit?: string }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    throw new Error("User not authenticated");
  }

  const resolvedParams = await searchParams;
  const query = resolvedParams.query || "";
  const currentPage = parseInt(resolvedParams.page || "1", 10);
  const limit = parseInt(resolvedParams.limit || "2", 10);
  const offset = (currentPage - 1) * limit;

  // Dynamic where clause construction
  const whereClause: Record<string, any> = { userEmail };
  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { department: { contains: query, mode: "insensitive" } },
    ];
  }

  const employees = await prisma.employee.findMany({
    where: whereClause,
    orderBy: { name: "asc" },
    skip: offset,
    take: limit,
  });

  const totalEmployees = await prisma.employee.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalEmployees / limit);

  return (
    <div className="w-full">
      <div className="flex flex-col mx-auto max-w-screen-lg px-4 py-8">
        <Search query={query} />
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
                  href={`?query=${query}&page=${i + 1}&limit=${limit}`}
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
