# SHEild

SHEild is a comprehensive women's safety application built with React Native and Expo. It aims to provide immediate assistance and supportive features to ensure the safety and well-being of its users.

## Features

- **Emergency SOS**: Quickly trigger alerts to emergency contacts and services.
- **Location Tracking**: Real-time location sharing with trusted contacts.
- **Authentication**: Secure user login and registration using Appwrite and Google Sign-In.
- **Community Support**: Connect with a supportive community.
- **Safety Resources**: Access to educational content and safety advice.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54), [React Native](https://reactnative.dev/)
- **Language**: TypeScript
- **UI Components**: [Gluestack UI](https://gluestack.io/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS), `react-native-css-interop`
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Backend & Auth**: [Appwrite](https://appwrite.io/)
- **Maps**: `react-native-maps`
- **Animations**: `lottie-react-native`, `@legendapp/motion`

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app on your mobile device (iOS/Android) for testing.

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

# Appwrite Configuration
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
EXPO_PUBLIC_APPWRITE_PROJECT_NAME="SHEild"
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint

# Google OAuth "Web application" client ID (NOT the Android client ID)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
# Optional: iOS client ID. Leave empty to use the browser flow on iOS.
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
```

> **Note**: For local development, ensure your mobile device is on the same network as your computer if using a local IP for the backend.

## Google Sign-In

Login is completed by the backend. The app only collects a Google **ID token** with
the native account picker and POSTs it to `POST /v1/auth/google/native`; Appwrite
verifies the token (signature, audience, expiry) and the backend issues the session
JWTs. The app never creates an Appwrite session itself.

If native sign-in cannot run (Expo Go, no Google Play Services, missing
`EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`, iOS without a client ID), the app automatically
falls back to the browser OAuth flow, which is also completed by the backend.
Dismissing the Google account picker cancels the login instead of falling back.

### Required configuration

1. **Google Cloud** ([Clients](https://console.cloud.google.com/auth/clients)) — create two clients in the same project:
   - **Web application** client. Leave origins/redirect URIs empty. This is the ID that
     goes into `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` and into Appwrite.
   - **Android** client with package name `com.sheild.app` and the SHA-1 of your signing
     certificate (`./gradlew signingReport`, or the Play App Signing key from Play Console).
     Google refuses to show the account picker without it. Its ID is never used in code.
2. **Appwrite Console** → **Auth** → **Social providers** → **Google** → enable
   **Native sign-in** and add the **Web client ID** under *Web client IDs*, then **Update**.
   Native sign-in is a separate switch from browser sign-in.
3. **Native module**: `@react-native-google-signin/google-signin` ships native code, so
   it needs a development build (`eas build --profile development`) or `npx expo prebuild`
   + a dev client. It does **not** run in Expo Go (the app then uses the browser flow).
4. **iOS (optional)**: add the Expo config plugin with your reversed client ID so the
   Google redirect can return to the app:
   ```json
   ["@react-native-google-signin/google-signin", { "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID" }]
   ```
   and set `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`.

### Browser fallback callback host

Appwrite puts the callback URL into the Google consent screen, so the hostname has
to be reachable **from the phone's own browser**:

- The backend treats a loopback `APP_URL` (`localhost`, `127.x`, `[::1]`) as a
  server-side convenience only. When the app reaches it from another host, the
  OAuth callback is rewritten to that host so the device browser can load it.
  The warning `... is a loopback address but the app called this server at ...`
  in the API logs tells you which host was used.
- Register every host you actually use in Appwrite Console → **Platforms** →
  **Web** (`localhost:5000`, `192.168.1.43:5000`, `10.0.2.2:5000`, your LAN IP…).
  Appwrite rejects the flow with a hostname-not-registered message otherwise, and
  your IP can change between networks.
- Alternative with a single stable host (Android): set
  `EXPO_PUBLIC_BACKEND_BASE_URL=http://localhost:5000` and run
  `adb reverse tcp:5000 tcp:5000`.

### Verify

- Wrong/missing web client ID → backend responds `user_oauth2_token_invalid`
  ("Audience mismatch…"), the app logs `native Google sign-in unavailable` and retries
  through the browser flow.
- Native sign-in disabled in Appwrite → backend logs
  `Native sign-in is disabled or no web client ID is configured`.

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
