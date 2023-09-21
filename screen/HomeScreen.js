import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import SearchBar from "../components/SearchBar";
import Recommendation from "../components/Recommendation";

export default HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "green",
            paddingHorizontal: 20,
            paddingTop: 50,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 40,
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Let get some search
          </Text>
          <SearchBar />
          <View style={{ width: 100, marginTop: 10 }}>
            <Button title="Search" />
          </View>
        </View>
        <Recommendation navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
