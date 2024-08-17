"use client";

import {API_URL} from "@/config";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useAppDispatch} from "@/redux/hooks";
import {setUser, IUser} from "@/redux/features/auth/authSlice";
import {useRouter} from "next/navigation";

type Inputs = {
    username: string;
    password: string
}

export function AuthForm({action}: { action: "login" | "register" }) {
    async function onSubmit() {
        try {
            const [username, password] = getValues(["username", "password"]);
            if (action === "login") await loginUser(username, password);
            if (action === "register") await registerUser(username, password);
        } catch (e) {
            if (e.request.status === 401) setError("root.serverError", {type: "401", message: "Invalid credentials"});
            if (e.request.status === 409) setError("root.serverError", {
                type: "409",
                message: "User with this name exists"
            });
        }
    }

    async function loginUser(username, password) {
        const user = await axios.post<IUser>(`${API_URL}/login`, {
            username,
            password
        });

        dispatch(setUser(user.data));
        router.push("/");
    }

    async function registerUser(username, password) {
        const user = await axios.post(`${API_URL}/register`, {
            username,
            password
        });

        dispatch(setUser(user.data));
        router.push("/");
    }

    function handleChange() {
        clearErrors("root.serverError")
    }

    const dispatch = useAppDispatch();
    const router = useRouter();
    const {register, handleSubmit, getValues, setError, clearErrors, formState: {errors}} = useForm<Inputs>()

    return (
        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    User name
                </label>
                <div className="mt-2">
                    <input
                        {...register("username")}
                        onChange={handleChange}
                        id="username"
                        required
                        autoComplete="off"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        {...register("password")}
                        onChange={handleChange}
                        id="password"
                        type="password"
                        required
                        autoComplete="off"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                {errors.root?.serverError &&
                  <div className="text-red-600 mt-1">{errors.root.serverError.message}</div>
                }
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {action === "login" ? "Sign in" : "Register"}
                </button>
            </div>
        </form>
    )
}