export interface IMessage {
    message: string,
    type: messageType
}

type messageType = 'success' | 'info' | 'warning' | 'error'
