import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import apiUrl from "./api/url";

function formatDateString(dateString) {
  if (!dateString) {
    return "";
  }

  return dateString.replace(/\//g, "/");
}
const numColumns = 2;
export default function Calendary({ navigation, route }) {
  const { user } = route.params;
  const [allsalle, setallsalle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}salles/surveillant/${user.id}`, {
          method: "GET",
        });
        const responseData = await response.json();
        setallsalle(responseData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[style2.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity style={style2.item}
      key={item.exam.id}
                  onPress={() =>
                    navigation.navigate("Etudiant", {
                      item: item,
                      user: user.id,
                    })
                  }
      >
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <View style={style2.horairee}>
          <View style={style2.horairee2}>
            <Icon2 name="calendar" style={{ color: "black", fontSize: 17 }}></Icon2>
            <Text  style={{ fontWeight: "bold" , fontSize:17 }}>{item.exam.date}</Text>
            </View>
            <View style={style2.horairee2}>
            <Icon2 name="ios-time" style={{ color: "black", fontSize: 17 }}></Icon2>
            <Text  style={{ fontWeight: "bold" , fontSize:17 }}>{item.exam.time}</Text>
            </View>
          </View>
          <View
            style={style2.Infor}
          >
            <Text style={{ fontWeight: "bold" , fontSize:20,color:"white" }}>{item.exam.matiere.nom}</Text>
            <Text style={{ fontWeight: "bold" , fontSize:20 , color:"white"}}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={styles.body}>
          <View
            style={{
              flexDirection: "column",
            }}
            >
            <View style={{ backgroundColor:'#2E1D73' , borderRadius:20 , marginBottom:20 , margin:10}}>
              <Text style={{ fontSize: 50, marginLeft: "25%" , color:"white" }}>Calendar</Text>
            </View>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={formatData(allsalle, numColumns)}
                style={style2.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
              />
            )}
          </View>
        </View>
      </View>
  );
}

const style2 = StyleSheet.create({
  
  item: {
    flex: 1,
    backgroundColor: "white",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: "black", // Add the shadow color here
    elevation: 30,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    borderRadius: 20,
    padding:5,
  },
  Infor:{
    flexDirection: "row",
    flex: 1,
    backgroundColor:"#2E1D73",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,   
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowRadius: 10,
    borderRadius: 20,
    marginRight: 3,
    marginBottom: 3,
  },
  horairee:{
    flexDirection: 'column',
    flex: 1,
    backgroundColor:"white",
    justifyContent: "space-between",
    alignItems: "center",
  },horairee2:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor:"white",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "Transparent",
  },
  body: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "white",
  },
});

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};
