import { IJWTResponse } from "@/interface/response/auth.response";
import { apiPatch } from "./api.client";
import { loadSession, saveSession } from "./token.storage";

// Backend endpoint that stores the self-selected role.
const UPDATE_ROLE_PATH = "/api/v1/user/role";

interface IUpdateRoleResponse {
    status: string;
    statusCode: number;
    user?: {
        id: string;
        email: string;
        name: string;
        avatarUrl?: string;
        role?: string;
    };
}

class UserService {
    // Persist the picked role server-side and mirror it into the stored
    // session so role-based UI can read it without another network call.
    async updateUserRole(role: string): Promise<IJWTResponse> {
        const result = await apiPatch<IUpdateRoleResponse>(UPDATE_ROLE_PATH, { role });

        const session = await loadSession();
        if (!session) {
            throw new Error("Not signed in");
        }

        const updated: IJWTResponse = {
            ...session,
            user: {
                id: result.user?.id ?? session.user?.id ?? "",
                email: result.user?.email ?? session.user?.email ?? "",
                name: result.user?.name ?? session.user?.name ?? "",
                avatarUrl: result.user?.avatarUrl ?? session.user?.avatarUrl,
                role: result.user?.role ?? role,
            },
        };
        await saveSession(updated);
        return updated;
    }
}

export default new UserService();
