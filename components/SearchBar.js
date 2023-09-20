import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        padding: 40
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#000',
    },
    input: {
        flex: 1,
        marginTop: 20,
        marginEnd: 20,
        height: 40,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 0,
    },
});