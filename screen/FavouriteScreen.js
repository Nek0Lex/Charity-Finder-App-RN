import { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';


export default FavouriteScreen = ({ navigation }) => {
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const keys = await AsyncStorage.getAllKeys();
      let dataArray = [];
      for (let key of keys) {
        let data = await AsyncStorage.getItem(key);
        dataArray.push(JSON.parse(data))
      }
      setFavouriteList(dataArray)
    }

    fetchData()
  }, []);

  const clearItem = async (ein) => {
    try {
      await AsyncStorage.removeItem(ein)
    } catch (e) {
      console.log(e)
    }
    console.log(`Removed ${ein}.`)
  }

  const CardItem = ({ detail }) => (
    <Card style={{
      display: 'flex',
      flexDirection: 'column',
      marginHorizontal: 15
    }}>
      <Text>{detail.name}</Text>
      <Button onPress={() => {
        setFavouriteList(
          favouriteList.filter((fav) => fav.ein != detail.ein)
        );
        clearItem(detail.ein)
      }}>Remove</Button>
    </Card>
  );

  return (
    <View>
      <FlatList
        data={favouriteList}
        renderItem={({ item }) => (
          <CardItem detail={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        ListFooterComponent={() => <View style={{ height: 15 }} />}
        ListHeaderComponent={() => <View style={{ height: 15 }} />}
      />
    </View>
  );
};
