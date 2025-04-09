import {AppUserRole} from "./AppUserRole.ts";

export type AppUser = {
    id: string,
    role: AppUserRole,
    username: string,
    avatarUrl: string
}