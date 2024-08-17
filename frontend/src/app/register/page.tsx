import Link from "next/link";
import {AuthForm} from "@/components/AuthForm";

export default function RegisterPage() {

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm action="register"/>
        <p className="mt-4 text-center text-sm text-gray-500">
          <span>Already have an account? </span>
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
