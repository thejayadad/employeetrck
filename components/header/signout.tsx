
import { signIn, signOut } from "@/auth"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className="border-purple-600 px-2 bg-gray-600 text-white hover:bg-gray-300 hover:text-purple-400 py-1 lg:py-2 lg:px-4 rounded-md" type="submit">SignOut</button>
    </form>
  ) 
} 