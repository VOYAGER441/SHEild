// Only EXPO_PUBLIC_* variables are inlined into the client bundle by
// babel-preset-expo, so EXPO_PUBLIC_BACKEND_BASE_URL always wins. The
// non-prefixed key is kept only for backwards compatibility with older .env files.
export const BACKEND_BASE_URL =
    process.env.EXPO_PUBLIC_BACKEND_BASE_URL ||
    process.env.BACKEND_BASE_URL ||
    ""

// Google OAuth "Web application" client ID. Google issues the native ID token
// for this audience; the backend accepts it when GOOGLE_CLIENT_ID_WEB matches.
export const EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || ""

// iOS OAuth client ID (optional, the reversed client ID). Needed for native
// sign-in on iOS; without it iOS sign-in is unavailable.
export const EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || ""
