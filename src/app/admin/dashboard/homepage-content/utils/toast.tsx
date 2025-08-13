import {toast} from "react-toastify";
/**
 * نظام الإشعارات المؤقت
 */
export const toast = {
  success: (message: string) => {
    toast.success(message)
    // يمكن استبدالها بمكتبة إشعارات حقيقية لاحقاً
  },
  error: (message: string) => {
    toast.error(message)
    // يمكن استبدالها بمكتبة إشعارات حقيقية لاحقاً
  },
}