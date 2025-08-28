import type {IMessage} from "@assets/models/endpoints/IMessage.ts";
import type {IPagination} from "@assets/models/endpoints/IPagination.ts";

export interface IResponse<T = object> {
    data?: T,
    messages: IMessage[],
    pagination: IPagination,
    statusCode: number
}