import {IDeed} from "@/models/deed";

export interface IFriend {
    userId: number;
    username: string;
    deeds: IDeed[];
}