import { auth } from "@/auth";
import GoogleBtn from "@/components/button/google-btn";
import SignIn from "@/components/header/signin";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default async function Home() {
  const session = await auth();
  const userEmail = session?.user?.email;
  
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="h-full flex items-center justify-center">
      {!session ? (
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome to EmployeeEase</h1>
          <p className="text-gray-600">
            A simple and efficient way to manage your employee records.
          </p>
          <p className="text-sm text-gray-500">
            Please sign in to get started and access your dashboard.
          </p>
            <SignIn />
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
