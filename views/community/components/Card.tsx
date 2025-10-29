import { View, Text } from "react-native";
import { Box } from "@/components/ui/box";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import Header from "./Header";
import Media from "./Media";
import Footer from "./Footer";

interface TweetCardProps {
    username: string;
    avatar: string;
    handle: string;
    date: string;
    content?: string;
    media?: {
        type: "image" | "video";
        // can be a remote uri string or a local module (require/import)
        url: any;
    };
}

export default function Card({
    username,
    avatar,
    handle,
    date,
    content,
    media,
}: TweetCardProps) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? "light"];

    return (
        <Box
            className=" p-4 "
            style={{
                backgroundColor: theme.card,
                borderRadius: theme.borderRadius,
                shadowColor: theme.shadowColor,
                shadowOffset: theme.shadowOffset,
                shadowOpacity: theme.shadowOpacity,
                shadowRadius: theme.shadowRadius,
                elevation: theme.elevation,
                marginTop: -5,
                marginBottom:20
            }}
        >
            <Header username={username} handle={handle} date={date} avatar={avatar} />

            {content ? (
                <Text
                    className="text-base mt-2 mb-3"
                    style={{ color: theme.text }}
                >
                    {content}
                </Text>
            ) : null}

            {media ? <Media type={media.type} url={media.url} /> : null}

            <Footer />
        </Box>
    );
}
