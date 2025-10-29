import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Text, Image, View } from "react-native";

interface Props {
    username: string;
    handle: string;
    date: string;
    avatar: string;
}

export default function Header({ username, handle, date, avatar }: Props) {
    return (
        <HStack className="items-center justify-between">
            <HStack className="items-center gap-2">
                <Image
                    source={{ uri: avatar }}
                    className="w-10 h-10 rounded-full"
                />
                <View>
                    <Text className="font-bold text-base">{username}</Text>
                    <Text className="text-gray-500 text-xs">
                        @{handle} · {date}
                    </Text>
                </View>
            </HStack>
            <Avatar
                className="w-5 h-5"
            >
                <AvatarImage
                    source={require("../../../assets/images/favicon.png")}
                />
            </Avatar>
        </HStack>
    );
}
