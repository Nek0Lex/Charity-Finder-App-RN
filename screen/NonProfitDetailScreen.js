import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import axios from "axios";
import NonProfitDetailData from "../modals/NonProfitDetailData";
import { ScrollView } from "react-native-virtualized-view";
import { Button, Title } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default NonProfitDetailScreen = ({ route, navigation }) => {
  let param = route.params;
  const [detail, setDetail] = useState(new NonProfitDetailData());
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://partners.every.org/v0.2/nonprofit/${param.ein}?apiKey=pk_live_b91eec9a87a8a37187b1e1d1bb505b63`
      )
      .then((response) => {
        let data = response.data.data;
        let nonprofit = data.nonprofit;
        let detail = new NonProfitDetailData(data);
        setDetail(detail);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const keys = await AsyncStorage.getAllKeys();
      console.log(keys);
      const isFav = keys.includes(param.ein);
      setIsFavourite(isFav);
    };

    fetchData();
  }, []);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      if (url != null && url != "") {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      } else {
        Alert.alert(`They don't have website for this :<`);
      }
    }, [url]);

    return (
      <Button
        icon="link"
        mode="contained"
        onPress={handlePress}
        buttonColor="green"
      >
        Website
      </Button>
    );
  };

  const StoreData = async (ein, detailData) => {
    try {
      console.log(`Start saving ${ein}...`);
      const jsonValue = JSON.stringify(detailData);
      await AsyncStorage.setItem(ein, jsonValue);
      setIsFavourite(true);
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteData = async (ein) => {
    try {
      await AsyncStorage.removeItem(ein);
      setIsFavourite(false);
    } catch (e) {
      console.log(e);
    }
    console.log(`Removed ${ein}.`);
  };

  return (
    <SafeAreaView style={styles.safeViewStyle}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{ uri: detail.logoUrl }}
            height={90}
            width={90}
            style={styles.image}
            onError={(e) => {
              console.log(e);
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileText}>{param.title}</Text>
            <Text style={styles.locationText}>📍{detail.locationAddress}</Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", flex: 1 }}
        >
          <Text style={styles.desc}>
            {detail.descriptionLong == null
              ? detail.description
              : detail.descriptionLong}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.button}>
        <OpenURLButton url={detail.websiteUrl}>Website</OpenURLButton>
        {isFavourite ? (
          <Button
            icon="heart"
            mode="contained"
            onPress={() => DeleteData(detail.ein)}
            buttonColor="green"
          >
            Favourite
          </Button>
        ) : (
          <Button
            icon="heart-outline"
            mode="contained"
            onPress={() => StoreData(detail.ein, detail)}
            buttonColor="green"
          >
            Favourite
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeViewStyle: { display: "flex", flexGrow: 1 },
  container: {
    // backgroundColor: "red",
    display: "flex",
    padding: 20,
    flexGrow: 1,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
  },
  profileText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    width: "80%",
    margin: 10,
  },
  image: {
    backgroundColor: "black",
  },
  desc: {
    color: "black",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});
