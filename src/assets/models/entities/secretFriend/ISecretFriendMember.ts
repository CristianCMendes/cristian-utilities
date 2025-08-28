import type {IUser} from "@assets/models/entities/user/IUser.ts";
import type {ISecretFriend} from "@assets/models/entities/secretFriend/ISecretFriend.ts";

export interface ISecretFriendMember {
    secretfriendid: number,
    userId: number,
    userPickedId: number,
    isAdmin: boolean,
    user: IUser,
    secretFriend: ISecretFriend,
}