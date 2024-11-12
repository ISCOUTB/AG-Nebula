"use server";

import { auth } from "@/lib/auth/authConfig";

export const checkIsAuthenticated = async () => {
    const session = await auth();
    if (session) {
        return session;
    } else {
        return false;
    }
}