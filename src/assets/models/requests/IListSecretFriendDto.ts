export interface IListSecretFriendDto {
    secretFriendId?: number[];
    creatorId?: number[];
    memberId?: number[];
    name?: string;
    description?: string;
    dateMin?: Date;
    dateMax?: Date;
    createdMin?: Date;
    createdMax?: Date;
    minimumPrice?: number;
    maximumPrice?: number;
    isActive?: boolean;
}