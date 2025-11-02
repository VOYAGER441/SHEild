import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native";
import Card from "./components/Card";
import PostSkeleton from "./components/Skeleton";
// require local image at runtime so TypeScript doesn't need a module declaration
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Community() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  type Tweet = {
    username: string;
    avatar: string;
    handle: string;
    date: string;
    content?: string;
    media?: {
      type: 'image' | 'video';
      // can be a remote uri (string) or a local module import
      url: any;
    };
  };

  const tweets: Tweet[] = [
    {
      username: "Alice",
      handle: "alice_dev",
      date: "28 Oct 2025",
      content: "Just launched a new React Native app! #Expo #ReactNative",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993"
    },
    {
      username: "Bob",
      handle: "bobux",
      date: "28 Oct 2025",
      content: "Beautiful sunset today 🌇",
      media: { type: "image", url: "https://images.unsplash.com/photo-1761872936161-9c2075a7ca11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500" },
      avatar: "https://images.unsplash.com/photo-1576280314550-773c50583407?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGRwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
    },
    {
      username: "Alice",
      handle: "alice_dev",
      date: "28 Oct 2025",
      content: "Just launched a new React Native app! #Expo #ReactNative",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993"
    },
    {
      username: "Bob",
      handle: "bobux",
      date: "28 Oct 2025",
      content: "Beautiful sunset today 🌇",
      media: { type: "image", url: "https://images.unsplash.com/photo-1761872936161-9c2075a7ca11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500" },
      avatar: "https://images.unsplash.com/photo-1576280314550-773c50583407?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGRwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
    },
    {
      username: "Alice",
      handle: "alice_dev",
      date: "28 Oct 2025",
      content: "Just launched a new React Native app! #Expo #ReactNative",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993"
    },
    {
      username: "Bob",
      handle: "bobux",
      date: "28 Oct 2025",
      content: "Beautiful sunset today 🌇",
      media: { type: "image", url: "https://images.unsplash.com/photo-1761872936161-9c2075a7ca11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500" },
      avatar: "https://images.unsplash.com/photo-1576280314550-773c50583407?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGRwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
    },
    {
      username: "Alice",
      handle: "alice_dev",
      date: "28 Oct 2025",
      content: "Just launched a new React Native app! #Expo #ReactNative",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993"
    },
    {
      username: "Bob",
      handle: "bobux",
      date: "28 Oct 2025",
      content: "Beautiful sunset today 🌇",
      media: { type: "image", url: "https://images.unsplash.com/photo-1761872936161-9c2075a7ca11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500" },
      avatar: "https://images.unsplash.com/photo-1576280314550-773c50583407?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGRwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
    }

  ];

  return (
    <ScrollView
      className="flex-1 p-4"
      style={{ backgroundColor: theme.background, marginBottom: 90 }}
    >
      <Box
        style={{
          backgroundColor: theme.card,
          borderRadius: theme.borderRadius,
          shadowColor: theme.shadowColor,
          shadowOffset: theme.shadowOffset,
          shadowOpacity: theme.shadowOpacity,
          shadowRadius: theme.shadowRadius,
          elevation: theme.elevation,
          marginBottom: 20,
          padding: 10,
        }}
      >
        <HStack>

          <Avatar size="md" >
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge />
          </Avatar>
          <Box className="flex-1 flex-row items-center justify-between"

          >

            <Box style={{
              backgroundColor: theme.background,
              marginLeft: 10,
              borderRadius: theme.borderRadius,
            }}
              className="p-3 text-center flex-1 justify-center"
            >
              <Text>post your thoughts !!!</Text>
            </Box>
            <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" style={{ margin: 10 }} />
          </Box>
        </HStack>

      </Box>
      {tweets.length === 0 ? (
        <PostSkeleton />
      ) : (
        tweets.map((tweet, idx) => <Card key={idx} {...tweet} />)
      )}
    </ScrollView>
  );
}
