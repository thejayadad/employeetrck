'use client'

import Link from 'next/link';
import React from 'react'

const SearchReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form) form.reset();
    }

  return (
    <button 
    className="absolute inset-y-0 right-4 flex items-center text-gray-900 hover:text-gray-700"

    type="reset" onClick={reset}>
        <Link href={'/'}>
            X 
        </Link>        
    </button>
  )
}

export default SearchReset