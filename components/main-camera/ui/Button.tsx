import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { buttonSelectors } from "../buttonSelectorEnum";


type Props = {
    title?: string;
    onPress?: () => void;
    icon: any;
    color?: string;
    backgroundColor?: string;
    selector?: buttonSelectors;
    iconSize: number;
}

export default function Button({title, onPress, icon, color, backgroundColor, selector, iconSize}: Props) {
    return (
        <TouchableOpacity onPress={onPress} 
        style={!selector ? {...styles.button, backgroundColor: backgroundColor ? backgroundColor : "#25222280"} : styles.closeButton}>
            <Ionicons name={icon} size={iconSize} color={color ? color : "#fff"}/>
            {title ? <Text style={styles.text}>{title}</Text> : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#fff",
        marginLeft: 10,
    },
    button: {
        height: 60,
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#25222280',
        // backgroundColor: '#FDDA30',
        borderRadius: 200,
        borderColor: '#ffffff30',
        borderWidth: 1,
    },
    closeButton: {
        height: 60,
        // width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#25222280',
        // backgroundColor: '#FDDA30',
        borderRadius: 200,
        // borderColor: '#ffffff30',
        // borderWidth: 1,
    }
})