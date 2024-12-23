import React from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SearchBar from '@/components/form/searchbar';

const DashboardPage = async () => {
    const session = await auth()
    const userEmail = session?.user?.email
    if(!session){
      redirect('/')
    }
  return (
    <div className='w-full'>
      <div className='flex flex-col mx-auto max-w-screen-lg px-4 py-8'>
          <SearchBar />
      </div>
    </div>  
  )
}

export default DashboardPage