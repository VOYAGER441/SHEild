import utils from "@/utils";
import { Client, Account } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

const client = new Client()
    .setEndpoint(utils.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // your endpoint
    .setProject(utils.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setPlatform("com.sheild.app"); // Set the platform bundle ID

export const account = new Account(client);
