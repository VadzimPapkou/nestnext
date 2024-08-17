"use client";

import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {IUser} from "@/models/userToken";
import React, {useEffect, useState} from "react";
import {axiosClient} from "@/axiosClient";
import {API_URL} from "@/config";
import {IDeed} from "@/models/deed";
import {FaPen, FaTrash} from "react-icons/fa6"
import {useRouter} from "next/navigation";
import clsx from "clsx";
import {FaSave} from "react-icons/fa";
import {NewDeedForm} from "@/components/NewDeedForm";

export function GoodDeeds(): React.ReactNode {
  async function deleteDeed(id: number) {
    await axiosClient.delete("/deeds/" + id);
    setDeeds(deeds.filter(deed => deed.id !== id));
  }

  async function updateDeed(id: number, updatedDeed) {
    await axiosClient.put("/deeds/" + id, updatedDeed);
    setDeeds(
      deeds.map(deed => {
        if (deed.id === id) return {...updatedDeed, id};
        else return deed;
      })
    )
  }

  async function updateDeeds() {
    if (!user) return;
    const url = new URL(API_URL + "/deeds");
    url.searchParams.append("userId", user.userId + "");
    const response = await axiosClient.get<IDeed[]>(url.toString());
    setDeeds(response.data);
  }

  const user: IUser = useAppSelector(state => state.auth.user);
  const router = useRouter();

  const [deeds, setDeeds] = useState<IDeed[]>([]);
  useEffect(() => {
    if (!user) {
      router.push("/login")
      return;
    }
    updateDeeds();
  }, [user, router]);

  return (
    <div>
      <NewDeedForm updateDeeds={updateDeeds}/>
      <div className="flex flex-wrap gap-2 mt-2 px-2">
        {deeds.map(deed => (
          <Deed
            key={deed.id}
            deed={deed}
            deleteDeed={() => deleteDeed(deed.id)}
            updateDeed={(updatedDeed) => updateDeed(deed.id, updatedDeed)}
          />
        ))}
      </div>
    </div>
  );

  function Deed({deed, deleteDeed, updateDeed}: {
        deed: IDeed,
        deleteDeed: Function,
        updateDeed: (deed: { title, description }) => void
    }) {
    function handleEditClick() {
      if (isEditMode) updateDeed({title, description});
      setIsEditMode(!isEditMode);
    }

    const titleClasses = "my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
    const descriptionClasses = "font-normal text-gray-700 dark:text-gray-400";

    const editButtonClasses = {
      edit: "relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none",
      save: "relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
    }

    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(deed.title);
    const [description, setDescription] = useState(deed.description);

    return (
      <div
        className="block w-60 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <button
          onClick={handleEditClick}
          className={isEditMode ? editButtonClasses.save : editButtonClasses.edit}
          type="button">
          <span
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {isEditMode ? <FaSave/> : <FaPen/>}
          </span>
        </button>
        <button
          onClick={deleteDeed}
          className="ml-1 relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"><span
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <FaTrash/>
          </span></button>

        {isEditMode && <>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className={clsx(titleClasses, "block border-gray-600 border-2 w-full")}/>
          <textarea value={description}
            onChange={e => setDescription(e.target.value)}
            className={clsx(descriptionClasses, "block border-gray-600 border-2")}/>
        </>}
        {!isEditMode && <>
          <div className={titleClasses}>{title}</div>
          <p className={descriptionClasses}>{description}</p>
        </>}
      </div>
    )
  }
}