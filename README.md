# SHEild

SHEild is a comprehensive women's safety application built with React Native and Expo. It aims to provide immediate assistance and supportive features to ensure the safety and well-being of its users.

## Features

- **Emergency SOS**: Quickly trigger alerts to emergency contacts and services.
- **Location Tracking**: Real-time location sharing with trusted contacts.
- **Authentication**: Secure user login via native Google Sign-In, verified by our Node.js backend.
- **Community Support**: Connect with a supportive community.
- **Safety Resources**: Access to educational content and safety advice.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54), [React Native](https://reactnative.dev/)
- **Language**: TypeScript
- **UI Components**: [Gluestack UI](https://gluestack.io/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS), `react-native-css-interop`
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Backend & Auth**: Node.js API (`sheild_api_server`) + native [Google Sign-In](https://github.com/react-native-google-signin/google-signin)
- **Maps**: `react-native-maps`
- **Animations**: `lottie-react-native`, `@legendapp/motion`

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A development build (`npx expo prebuild` or EAS) — native Google Sign-In does not run in Expo Go.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd SHEild
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

## Environment Setup

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Open the `.env` file and configure the necessary variables:

```env
EXPO_PUBLIC_BACKEND_BASE_URL=http://your-backend-ip:5000

# Google OAuth "Web application" client ID (NOT the Android client ID).
# Must match GOOGLE_CLIENT_ID_WEB on the backend.
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
# Optional: iOS client ID (reversed client ID). Required for native sign-in on iOS.
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
```

> **Note**: For local development, ensure your mobile device is on the same network as your computer if using a local IP for the backend.

## Google Sign-In

Login uses the **native** Google account picker (`@react-native-google-signin/google-signin`).
The app collects a Google **ID token** and POSTs it to `POST /api/v1/auth/google`; the
Node.js backend verifies the token with `google-auth-library` (signature, audience,
expiry), upserts the user and returns its own access/refresh JWTs. Tokens are stored in
**expo-secure-store** (Keychain/Keystore) and attached as `Authorization: Bearer …` by
the shared axios client (`services/api.client.ts`).

There is **no browser fallback**: if the native module is missing (Expo Go), sign-in
fails with a clear error — use a development build. Dismissing the account picker
cancels the login.

### Required configuration

1. **Google Cloud** ([Clients](https://console.cloud.google.com/auth/clients)) — create two clients in the same project:
   - **Web application** client. Leave origins/redirect URIs empty. This is the ID that
     goes into `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` **and** `GOOGLE_CLIENT_ID_WEB` on the backend.
   - **Android** client with package name `com.sheild.app` and the SHA-1 of your signing
     certificate (`./gradlew signingReport`, or the Play App Signing key from Play Console).
     Google refuses to show the account picker without it. Its ID can optionally be added
     as an extra audience (`GOOGLE_CLIENT_ID_ANDROID`) on the backend.
2. **Native module**: `@react-native-google-signin/google-signin` ships native code, so
   it needs a development build (`eas build --profile development`) or `npx expo prebuild`
   + a dev client. It does **not** run in Expo Go.
3. **iOS (optional)**: the config plugin is registered in `app.json`; add your reversed
   client ID as `iosUrlScheme` so the Google redirect can return to the app:
   ```json
   ["@react-native-google-signin/google-signin", { "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID" }]
   ```
   and set `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`.

### Verify

- Wrong/missing web client ID → backend responds `401 Google sign-in could not be verified`
  (audience mismatch in the API logs).
- No `GOOGLE_CLIENT_ID_*` on the backend → `500 Google sign-in is not configured on the server`.
- Expo Go → the app logs `RNGoogleSignin native module is not in this build` and the
  login button surfaces that error.

## Running the Application

Start the development server:

```bash
npm start
```

Use the following commands to run on specific platforms:

- **Android**:
  ```bash
  npm run android
  ```
- **iOS**:
  ```bash
  npm run ios
  ```
- **Web**:
  ```bash
  npm run web
  ```

## Project Structure

- **/app**: Expo Router pages and layouts.
- **/components**: Reusable UI components.
- **/services**: API and authentication services.
- **/utils**: Helper functions and constants.
- **/views**: Specific view components (if separated from routes).
- **/assets**: Images, fonts, and other static assets.
- **/interface**: TypeScript interfaces and types.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.
