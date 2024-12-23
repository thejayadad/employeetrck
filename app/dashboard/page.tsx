import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignOut from '@/components/header/signout';

const DashboardPage = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    if(!session){
      redirect('/')
    }
  return (
    <div>DashboardPage
      {userEmail}
      <SignOut />
    </div>
  )
}

export default DashboardPage