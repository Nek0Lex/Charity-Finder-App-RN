import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import SearchBar from "../components/SearchBar";
import Recommendation from "../components/Recommendation";
import { ScrollView } from "react-native-virtualized-view";
import { Button, IconButton, Title } from "react-native-paper";
import NonProfit from "../modals/NonProfit";
import axios from "axios";
import { useState, useEffect } from "react";

export default HomeScreen = ({ navigation }) => {
  const [nonProfits, setNonProfits] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://partners.every.org/v0.2/search/pets?apiKey=pk_live_b91eec9a87a8a37187b1e1d1bb505b63`
      )
      .then((response) => {
        let arr = [];
        response.data.nonprofits.map((data) => {
          arr.push(
            new NonProfit(
              data.ein,
              data.name,
              data.profileUrl,
              data.matchedTerms,
              data.slug,
              data.location,
              data.tags,
              data.logoUrl
            )
          );
        });

        setNonProfits(arr);
      });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topContainer}>
          <IconButton
            style={{
              alignSelf: "flex-end",
            }}
            icon="heart"
            iconColor="white"
            onPress={() => navigation.navigate("Favourite")}
          />
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.searchTitle}>Let get some search!</Text>
          <SearchBar
            onSearch={(searchResult) => {
              setNonProfits(searchResult);
            }}
          />
        </View>
        <Recommendation navigation={navigation} nonProfitsList={nonProfits} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  searchTitle: {
    color: "white",
    fontSize: 20,
  },
});
