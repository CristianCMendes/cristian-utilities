export interface IUser {
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    isEmailConfirmed: boolean,
    invitedById?: number,
    createdAt: Date,
}

export interface IUserAuth extends IUser {
    token?: string,
    expires?: Date
}