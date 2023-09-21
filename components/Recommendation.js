import { View, StyleSheet, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text>{title}</Text>
    </View>
);

export default function Recommendation() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                You may interested
            </Text>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        paddingVertical: 20
    }
});