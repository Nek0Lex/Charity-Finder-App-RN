import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Title } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import NonProfit from "../modals/NonProfit";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [nonProfits, setNonProfits] = useState([]);

  const search = () => {
    if (searchText) {
      axios
        .get(
          `https://partners.every.org/v0.2/search/${searchText}?apiKey=pk_live_b91eec9a87a8a37187b1e1d1bb505b63`
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

          onSearch(arr);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => {
          setSearchText(newText);
        }}
      />
      <View style={{ width: 100, marginTop: 15 }}>
        <Button
          title="Search"
          mode="outlined"
          onPress={() => search()}
          style={styles.searchButton}
          textColor="white"
          borderColor="white"
        >
          Search
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 40,
  },
  searchButton: {
    borderWidth: 2,
    borderColor: "white",
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    borderColor: "#000",
  },
  input: {
    width: "100%",
    marginTop: 20,
    marginEnd: 20,
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 0,
  },
});
