import type {IMessage} from "@assets/models/endpoints/IMessage.ts";
import {toast} from "react-toastify";
import type {IResponse} from "@assets/models/endpoints/IResponse.ts";

export const useToast = () => {

    function toastFromMessage(message: IMessage) {
        const {type, message: msg} = message

        const doToast = {
            'success': () => toast.success(msg),
            'info': () => toast.info(msg),
            'warning': () => toast.warning(msg),
            'error': () => toast.error(msg),
            default: () => toast.info(msg),
        }[type]

        doToast()
    }

    // ignoreImportant is used to ignore important messages, because they will be treated differently
    function toastFromResponse(response: IResponse, ignoreImportant = true) {
        response.messages.filter(x => ignoreImportant && !x.important || true).forEach(x => toastFromMessage(x))
    }

    return {toastFromMessage, toastFromResponse}
}