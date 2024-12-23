import React from 'react'
import SignOut from './signout'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className="flex mx-auto max-w-screen-lg py-8 px-4 justify-between items-center">
          <span className="text-gray-600 text-xl lg:text-2xl font-extrabold">
            Roster<span className='text-purple-600'>Relay</span>
          </span>
          <SignOut />
        </div>
    </header>
  )
}

export default Header