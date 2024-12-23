'use client'
import {useFormStatus} from "react-dom"
import {FcGoogle} from "react-icons/fc"

const GoogleBtn = () => {
    const {pending} = useFormStatus()

  return (
    <>
         {pending ? (
              <button disabled className="flex items-center justify-center w-full space-x-1">
                  <span className="loading loading-dots loading-md"></span>
                  One Moment...
              </button>
          ) :
          (
              <button className="btn text-gray-700 hover:text-gray-800 bg-gray-100 hover:bg-gray-300 w-full">
                <span>
                    <FcGoogle
                    className="h-6 w-6"
                    />
                </span>
                SignIn With Google</button>
          )
      
      }
    </>
  )
}

export default GoogleBtn