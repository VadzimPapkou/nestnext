"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {axiosClient} from "@/axiosClient";
import {IUser} from "@/models/userToken";
import {useAppSelector} from "@/redux/hooks";

type Inputs = {
    friendId: string;
}
export function AddFriendForm({updateFriends}: {updateFriends: Function}) {
    async function onSubmit() {
        if (!user) return;
        const friendId = getValues("friendId");
        await axiosClient.post(`/users/${user.userId}/friends`, {
            friendId
        });
        setValue("friendId", "");
        updateFriends();
    }

    const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm<Inputs>();
    const user: IUser = useAppSelector(state => state.auth.user);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="friendId" className="block text-sm font-medium leading-6 text-gray-900">
                Friend id:
            </label>
            <input
                {...register("friendId", {required: true})}
                id="friendId"
                placeholder="34"
                required
                className="block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
                className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Add friend
            </button>
        </form>
    )
}