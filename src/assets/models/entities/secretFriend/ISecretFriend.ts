import type {IUser} from "@assets/models/entities/user/IUser.ts";
import type {ISecretFriendMember} from "@assets/models/entities/secretFriend/ISecretFriendMember.ts";

export interface ISecretFriend {
    id: number,
    name: string,
    description?: string,
    createdAt: Date,
    createdById: number,
    date: Date,
    minimumPrice?: number,
    maximumPrice?: number,
    isActive: boolean,
    allowPick: boolean,
    createdBy?: IUser,
    members: ISecretFriendMember[],
}