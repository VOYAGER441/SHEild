export const SESSION_DATA_KEY_FOR_LOCAL_STORAGE = "sessionData";

export const enum authProvider {
    GOOGLE = "Google",
    FACEBOOK = "Facebook",
    LINKEDIN = "LinkedIn",
    APPLE = "Apple",
}

// User roles. Matches the backend USER_ROLE enum in
// sheild_api_server/src/utils/appConstant.ts.
export const enum USER_ROLE {
    ADMIN = "admin",
    USER = "user",
    WOMEN = "women",
    PARENT = "parent",
    CHILD = "child",
    ALZHEIMER_PATIENT = "alzheimer_patient",
}

// Roles the user may self-select on the role-picker screen after first
// sign-in. ADMIN and the default USER are deliberately excluded.
export const PICKABLE_ROLES = [
    USER_ROLE.WOMEN,
    USER_ROLE.PARENT,
    USER_ROLE.CHILD,
    USER_ROLE.ALZHEIMER_PATIENT,
] as const;

// Which tab screens each role sees. Roles not listed here (user, admin)
// get the full set - nothing changes for existing users.
export const ROLE_TABS: Record<string, string[]> = {
    [USER_ROLE.WOMEN]: ["index", "track", "sos", "community", "profile"],
    [USER_ROLE.PARENT]: ["index", "track", "sos", "profile"],
    [USER_ROLE.CHILD]: ["index", "sos", "profile"],
    [USER_ROLE.ALZHEIMER_PATIENT]: ["index", "sos", "profile"],
};

export const FULL_TAB_SET = ["index", "track", "sos", "community", "profile"];

// true when the account has not picked a role yet (still the default "user")
export function needsRoleSelection(role?: string): boolean {
    return !role || role === USER_ROLE.USER;
}

export function tabsForRole(role?: string): string[] {
    return ROLE_TABS[role ?? ""] ?? FULL_TAB_SET;
}
