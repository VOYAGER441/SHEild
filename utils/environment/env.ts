// Only EXPO_PUBLIC_* variables are inlined into the client bundle by
// babel-preset-expo, so EXPO_PUBLIC_BACKEND_BASE_URL always wins. The
// non-prefixed key is kept only for backwards compatibility with older .env files.
export const BACKEND_BASE_URL =
    process.env.EXPO_PUBLIC_BACKEND_BASE_URL ||
    process.env.BACKEND_BASE_URL ||
    ""

export const EXPO_PUBLIC_APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || ""
export const EXPO_PUBLIC_APPWRITE_PROJECT_NAME = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME || "SHEild"
export const EXPO_PUBLIC_APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"

// Google OAuth "Web application" client ID. Google issues the native ID token for
// this ID and Appwrite only accepts tokens whose audience matches a web client ID
// configured on the Google provider.
export const EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || ""

// iOS OAuth client ID (optional). Without it native sign-in on iOS is skipped and
// the browser flow is used instead.
export const EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || ""