import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TextInput, Button } from 'react-native';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
    return (
        <SafeAreaView style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'green',
                height: '55%',
                paddingTop: StatusBar.currentHeight + 20,
                paddingStart: 20
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 40,
                }}>
                    Hello
                </Text>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                }}>
                    Let get some search
                </Text>
                <SearchBar />
                <View style={{ width: 100, alignItems: 'center', marginTop: 10 }}>
                    <Button title='Search' />
                </View>
 
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
