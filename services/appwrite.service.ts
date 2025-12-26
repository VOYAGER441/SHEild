import utils from "@/utils";
import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint(utils.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) // your endpoint
    .setProject(utils.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
