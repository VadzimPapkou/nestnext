import {useForm} from "react-hook-form";
import React from "react";
import {axiosClient} from "@/axiosClient";

type Inputs = {
    title: string;
    description: string;
}

export function NewDeedForm({updateDeeds}: {updateDeeds: Function}): React.ReactNode {
  async function onSubmit() {
    const [title, description] = getValues(["title", "description"]);
    await axiosClient.post("/deeds", {title, description});
    setValue("title", "");
    setValue("description", "");
    updateDeeds();
  }

  const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] w-full p-2">
      <label htmlFor="title">Title:</label>
      <input {...register("title", {required: true})}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Make a coffe"
        id="title"
        required
      />
      <label htmlFor="description">Description:</label>
      <textarea {...register("description", {required: true})}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Add 1 to 2 tablespoons of ground coffee to your coffee maker's filter or French press..."
        id="description"
        required
      />
      <button
        className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Create a good deed
      </button>
    </form>
  )
}