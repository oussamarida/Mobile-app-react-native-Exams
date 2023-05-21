import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
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

  return dateString.replace(/\//g, "      ");
}
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

  return (
    <>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={styles.body}>
          <ScrollView
            style={{
              flexDirection: "column",
              paddingBottom: 40,
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              allsalle.map((item) => (
                <TouchableOpacity
                  style={styles.day}
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
                      flex: 2.6,
                      borderRadius: 20,
                      backgroundColor: "#2E1D73",
                    }}
                    key={item.exam.id}
                  >
                    <Text
                      style={[styles.heure, { color: "white", marginLeft: 5 }]}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "normal" }}>
                        Date:{" "}
                      </Text>
                      {formatDateString(item.exam.date)}
                    </Text>
                  </View>
                  <View style={{ flex: 4.2 }} key={item.exam.id}>
                    <Text style={[styles.heure, { fontSize: 16 }]}>
                      <Text style={{ fontSize: 13, fontWeight: "normal" }}>
                        {item.exam.time}
                      </Text>
                    </Text>
                    <Icon2
                      name="ios-time"
                      style={{ marginLeft: 30, color: "black", fontSize: 20 }}
                    ></Icon2>
                    <Text
                      style={[
                        styles.heure,
                        { color: "black", marginLeft: 5, fontSize: 18 },
                      ]}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "normal" }}>
                        {item.exam.matiere.nom}
                      </Text>
                    </Text>
                  </View>
                  <View
                    key={item.exam.id}
                    style={{
                      flex: 5,
                      flexDirection: "row",
                      padding: 30,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Icon name="door" style={styles.icon}></Icon>
                    <Text style={styles.heure}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
            <View style={{ height: 50, width: 10 }}></View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  body: {
    flex: 1.3,
    borderRadius: 30,
    backgroundColor: "white",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    width: "100%",
    height: "100%",
  },
  day: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    width: "100%",
    height: 120,
    flexDirection: "row",
    marginBottom: 10,
  },
  heure: {
    flex: 1,
    marginLeft: "10%",
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  tach: {
    flex: 2,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    height: 120,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
  },
  icon: {
    color: "black",
    fontSize: 50,
  },
});
