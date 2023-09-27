import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, Button } from "react-native-paper";

export default FavouriteScreen = ({ navigation }) => {
  const [favouriteList, setFavouriteList] = useState([]);

  //Get data at start
  useEffect(() => {
    const fetchData = async () => {
      const keys = await AsyncStorage.getAllKeys();
      let dataArray = [];
      for (let key of keys) {
        let data = await AsyncStorage.getItem(key);
        dataArray.push(JSON.parse(data));
      }
      setFavouriteList(dataArray);
    };

    fetchData();
  }, []);

  //Delete when press again
  const clearItem = async (ein) => {
    try {
      await AsyncStorage.removeItem(ein);
    } catch (e) {
      console.log(e);
    }
    console.log(`Removed ${ein}.`);
  };

  const CardItem = ({ detail }) => (
    <Card style={styles.cardContainer}>
      <Text>{detail.name}</Text>
      <Button
        onPress={() => {
          setFavouriteList(
            favouriteList.filter((fav) => fav.ein != detail.ein)
          );
          clearItem(detail.ein);
        }}
      >
        Remove
      </Button>
    </Card>
  );

  const ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparatorComponent} />;
  };

  return (
    <View>
      <FlatList
        data={favouriteList}
        renderItem={({ item }) => <CardItem detail={item} />}
        ItemSeparatorComponent={() => <ItemSeparatorComponent />}
        ListFooterComponent={() => <ItemSeparatorComponent />}
        ListHeaderComponent={() => <ItemSeparatorComponent />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeparatorComponent: { height: 15 },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 15,
  },
});
