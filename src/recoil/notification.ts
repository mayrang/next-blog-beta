import { NotificationType } from "@/utils/type";
import { atom } from "recoil";

export const notificationAtom = atom<NotificationType>({
  key: "notificationAtom",
  default: {
    notificationType: null,
    message: null,
    type: undefined,
  },
});
