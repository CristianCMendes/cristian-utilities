import type {ISecretFriend} from "@assets/models/entities/secretFriend/ISecretFriend.ts";
import type {IUser} from "@assets/models/entities/user/IUser.ts";

export interface ISecretFriendWishlist {
    secretFriendId: number,
    userId: number,
    wish: string,
    price: number,
    date: Date,
    secretFriend: ISecretFriend,
    user: IUser,
}