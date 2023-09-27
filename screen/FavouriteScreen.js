import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from "react-native";

export default FavouriteScreen = ({ navigation }) => {
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      keys.map(async (k) => {
        const detail = await AsyncStorage.getItem(k);
        setFavouriteList([...favouriteList, detail]);
      });
    } catch (e) {
      // read key error
    }

    console.log(keys);
  };

  return (
    <View>
      <FlatList
        data={favouriteList}
        renderItem={({ item }) => <Text>${item}</Text>}
      />
    </View>
  );
};
