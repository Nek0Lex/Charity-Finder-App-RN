import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import NonProfit from "../modals/NonProfit.js";

const Card = ({ nonProfitsObj, onPress }) => (
  <Pressable onPress={onPress}>
    <View style={styles.card}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: nonProfitsObj.logoUrl }}
          height={50}
          width={50}
          style={{ backgroundColor: "black" }}
          borderRadius={30}
        />
        <Text style={{ paddingHorizontal: 10, width: "90%" }}>
          {nonProfitsObj.name}
        </Text>
      </View>
      <View>
        <Text numberOfLines={1}>📍{nonProfitsObj.location}</Text>
      </View>
    </View>
  </Pressable>
);

export default function Recommendation({ navigation, nonProfitsList }) {
  //   const [nonProfits, setNonProfits] = useState([]);
  // useEffect(() => {
  //     axios
  //         .get(
  //             `https://partners.every.org/v0.2/search/pets?apiKey=pk_live_b91eec9a87a8a37187b1e1d1bb505b63`
  //         )
  //         .then((response) => {
  //             let arr = [];
  //             response.data.nonprofits.map((data) => {
  //                 arr.push(
  //                     new NonProfit(
  //                         data.ein,
  //                         data.name,
  //                         data.profileUrl,
  //                         data.matchedTerms,
  //                         data.slug,
  //                         data.location,
  //                         data.tags,
  //                         data.logoUrl
  //                     )
  //                 );
  //             });

  //             setNonProfits(arr);
  //         });
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You may interested</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={nonProfitsList}
        renderItem={({ item }) => (
          <Card
            nonProfitsObj={item}
            onPress={() =>
              navigation.navigate("NonProfitDetail", {
                title: item.name,
                ein: item.ein,
              })
            }
          />
        )}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => (
          <View style={{ height: 10, backgroundColor: "white" }}></View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: 20, backgroundColor: "white" }}></View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 15,
  },
});
