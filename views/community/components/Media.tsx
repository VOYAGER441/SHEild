import { View, Image, Pressable, ImageSourcePropType } from "react-native";
import { useState } from "react";
// import { Video } from "expo-av";
// import { Play } from "lucide-react-native";

interface Props {
    type: "image" | "video";
    // accept either a remote uri string or a local image module/type
    url: ImageSourcePropType | string;
}

export default function Media({ type, url }: Props) {
    if (type === "image") {
        const [failed, setFailed] = useState(false);
        const source = typeof url === "string" ? { uri: url } : url;
        const fallback = require("@/assets/images/loading.png");

        return (
            <View className="rounded-xl overflow-hidden mt-2">
                <Image
                    source={failed ? fallback : source}
                    className="w-full h-48 rounded-xl"
                    // ensure size on web/native if className/nativewind isn't applied
                    style={{ width: "100%", height: 190 }}
                    resizeMode="cover"
                    onError={(e) => {
                        // mark as failed so we show a local fallback image
                        console.warn("Image failed to load:", source, e.nativeEvent?.error);
                        setFailed(true);
                    }}
                />
            </View>
        );
    }

    //   if (type === "video") {
    //     return (
    //       <View className="rounded-xl overflow-hidden mt-2 relative">
    //         <Video
    //           source={{ uri: url }}
    //           style={{ width: "100%", height: 190, borderRadius: 12 }}
    //           resizeMode="cover"
    //           shouldPlay={false}
    //           isMuted
    //         />
    //         <Pressable
    //           className="absolute inset-0 items-center justify-center bg-black/20"
    //           onPress={() => {}}
    //         >
    //           <Play color="white" size={40} />
    //         </Pressable>
    //       </View>
    //     );
    //   }

    return null;
}
