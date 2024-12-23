import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    if(!session){
      redirect('/')
    }
  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        DashboardPAge
      </div>
    </div>  
  )
}

export default DashboardPage