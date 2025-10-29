import { HStack } from "@/components/ui/hstack";
import { Text } from "react-native";
import Feather from '@expo/vector-icons/Feather';
export default function Footer() {
    return (
        <HStack className="justify-between px-2" style={{ marginTop: 20,marginBottom:5 }}>
            <Feather name="message-circle" size={24} color="black" />
            <Feather name="repeat" size={24} color="black" />
            <Feather name="heart" size={24} color="black" />
            <Feather name="share" size={24} color="black" />
        </HStack>
    );
}
