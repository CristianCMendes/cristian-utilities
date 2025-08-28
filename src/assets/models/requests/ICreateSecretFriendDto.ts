import type {Dayjs} from "dayjs";

export interface ICreateSecretFriendDto {
    name: string;
    date: Dayjs;
    description?: string;
    minimumPrice?: number;
    maximumPrice?: number;
}