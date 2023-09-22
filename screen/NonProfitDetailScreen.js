import { useEffect, useState, useCallback } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, Linking, Alert } from "react-native";
import axios from "axios";
import NonProfitDetailData from "../modals/NonProfitDetailData";
import { ScrollView } from "react-native-virtualized-view";
import { Button, Title } from "react-native-paper";


export default NonProfitDetailScreen = ({ route, navigation }) => {
  let param = route.params;
  const [detail, setDetail] = useState(new NonProfitDetailData());

  useEffect(() => {
    axios
      .get(
        `https://partners.every.org/v0.2/nonprofit/${param.ein}?apiKey=pk_live_b91eec9a87a8a37187b1e1d1bb505b63`
      )
      .then((response) => {
        let data = response.data.data
        let nonprofit = data.nonprofit
        let detail = new NonProfitDetailData(data)
        setDetail(detail);
      });
  }, []);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      if (url != null && url != '') {
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

    return <Button icon="link" mode="contained" onPress={handlePress} buttonColor='green'>
      Website
    </Button>;
  };

  return (
    <SafeAreaView style={{ display: "flex", flexGrow: 1 }}>
      <View style={styles.container}>
        <View
          style={styles.profile}
        >
          <Image
            source={{ uri: detail.logoUrl }}
            height={90}
            width={90}
            style={styles.image}
            onError={(e) => { console.log(e) }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileText}>
              {param.title}
            </Text>
            <Text style={styles.locationText}>
              📍{detail.locationAddress}
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.desc}>
            {detail.descriptionLong == null ? detail.description : detail.descriptionLong}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.button}>
        <OpenURLButton url={detail.websiteUrl}>
          Website
        </OpenURLButton>
        <Button icon="heart-outline" mode="contained" onPress={() => console.log('Pressed')} buttonColor='green'>
          Favourite
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    display: 'flex',
    padding: 20,
    flexGrow: 1
  },
  profile: {
    display: 'flex',
    flexDirection: "row",
  },
  profileText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  locationText: {
    width: '80%',
    margin: 10,
  },
  image: {
    backgroundColor: "black",
  },
  desc: {
    color: "black",
    marginTop: 20
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
});

