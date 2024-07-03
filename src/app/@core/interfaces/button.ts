import { UserStatus } from "../enum/user-status";
import { ButtonActionTypes } from "../types/table.types";

export interface IActionButton {
    label: string;
    action: ButtonActionTypes;
    icon?: string;
    status?: UserStatus[];
    statusKey?: string;
    showAction?: boolean;
}