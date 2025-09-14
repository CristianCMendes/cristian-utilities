export interface IMessage {
    message: string,
    type: messageType,
    important: boolean
}

type messageType = 'success' | 'info' | 'warning' | 'error'
