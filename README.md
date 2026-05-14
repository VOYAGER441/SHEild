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
```

> **Note**: For local development, ensure your mobile device is on the same network as your computer if using a local IP for the backend.

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
