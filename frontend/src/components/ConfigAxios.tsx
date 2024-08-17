"use client";

import {useAppDispatch, useAppSelector, useAppStore} from "@/redux/hooks";
import {axiosClient} from "@/axiosClient";
import React, {useEffect, useRef} from "react";
import {setUser} from "@/redux/features/auth/authSlice";
import {useRouter} from "next/navigation";
import {IUser} from "@/models/userToken";

export function ConfigAxios({children}): React.ReactNode {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const user: IUser = useAppSelector(state => state.auth.user);
  const router = useRouter();

  const interceptorsRef = useRef<{requestInterceptor: number, responseInterceptor: number}>();

  useEffect(() => {
    if(interceptorsRef.current?.responseInterceptor) axiosClient.interceptors.response.eject(interceptorsRef.current?.responseInterceptor);
    if(interceptorsRef.current?.requestInterceptor) axiosClient.interceptors.request.eject(interceptorsRef.current?.requestInterceptor);

    const responseInterceptor = axiosClient.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (401 === error.response.status) {
        dispatch(setUser(null));
        router.push("/login");
      } else {
        return Promise.reject(error);
      }
    });
    const requestInterceptor = axiosClient.interceptors.request.use(function (request) {
      if(user) {
        request.headers.Authorization = "Bearer " + user.accessToken;
      }
      return request;
    });

    interceptorsRef.current = {requestInterceptor, responseInterceptor};
  } ,[store, router, dispatch, user]);

  return children;
}