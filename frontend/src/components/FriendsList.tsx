"use client";

import React, {useEffect, useState} from "react";
import {axiosClient} from "@/axiosClient";
import {useAppSelector} from "@/redux/hooks";
import {IUser} from "@/models/userToken";
import {useRouter} from "next/navigation";
import {IFriend} from "@/models/friend";
import {FaTrash} from "react-icons/fa6";
import {AddFriendForm} from "@/components/AddFriendForm";

export function FriendsList(): React.ReactNode {
  async function updateFriends() {
    if (!user) return;
    const {data} = await axiosClient.get(`/users/${user.userId}/friends`);
    setFriends(data);
  }

  async function deleteFriend(deleteFriendId: number) {
    if (!user) return;
    await axiosClient.delete(`/users/${user.userId}/friends/${deleteFriendId}`);
    updateFriends();
  }

  const router = useRouter();

  const user: IUser = useAppSelector(state => state.auth.user);
  const [friends, setFriends] = useState<IFriend[]>([]);
  useEffect(() => {
    updateFriends();
  }, []);

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <div className="p-2">
      <p>Your friend id is {user.userId}</p>
      <AddFriendForm updateFriends={updateFriends} />
      <h1 className="mt-2 text-2xl font-bold">Friends:</h1>
      <ul className="flex flex-col gap-2">
        {friends.map((friend) => <Friend key={friend.userId} friend={friend}
          deleteFriend={() => deleteFriend(friend.userId)}/>)}
      </ul>
    </div>
  )
}

function Friend({friend, deleteFriend}: { friend: IFriend, deleteFriend: Function }): React.ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <li key={friend.userId}>
      <div className="flex">
        <button className="underline text-blue-500 text-2xl min-w-[100px] text-start" onClick={() => setOpen(!open)}>{friend.username}</button>
        <button onClick={deleteFriend}
          className="ml-1 relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[30px] h-10 max-h-[30px] rounded-lg text-xs bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          <span
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <FaTrash/>
          </span>
        </button>
      </div>
      {open && (
        friend.deeds.length === 0 ?
          <p>{friend.username} don{"'"}t have good deeds</p> :
          (
            <ul className="flex flex-wrap gap-2 mt-2">
              {friend.deeds.map(deed => (
                <li key={deed.id}
                  className="block w-60 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <p className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {deed.title}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {deed.description}
                  </p>
                </li>
              ))}
            </ul>
          )
      )}
    </li>
  )
}
