import { User } from "../store/store"

export const usePermission = () => {
    const allowedRoles = ["admin", "manager"]
    
    const _herPermission = (user: User | null) => {
        if (user) {
            return allowedRoles.includes(user.role)
        }

        return false;
    };

    return {
        isAllowed: _herPermission
    }
}