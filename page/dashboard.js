import { Image, Text, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import { useRoute } from '@react-navigation/native';
import { useEffect } from "react";
import apiUrl from './api/url'

export default function Dashbord({ navigation , route }) {

 
  const { user } = route.params;

  
  
  function Calendar() {
    navigation.navigate("Calendary",{user:user});
  }
  function Logout() {
    navigation.goBack();
  }

  function Profile() {
    navigation.navigate("Profile",{user:user});
  }

  return (
    <View style={styles.containers}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/backdashbord.png")}
      >
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 30 }}>Dashbord</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.profil}>
            <Image
              source={require("../assets/profil/profil.jpg")}
              style={styles.image}
            />
          </View>
          <View style={styles.nom}>
            <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
              {user.nom} 
            </Text>
            <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" , marginLeft:30 }}>
                  {user.prenom}
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                marginLeft: 15,
                marginTop: 10,
              }}
            >
              surveillant
            </Text>
            <TouchableOpacity onPress={Logout} >
            <Icon name="sign-out" style={styles.icon2}></Icon>
            </TouchableOpacity>

          </View>
        </View>
        
        <View style={styles.Dashbord}>
          
          <View style={styles.row}>
            <TouchableOpacity onPress={Calendar} style={styles.item}>
              <View
                style={{
                  flex: 2,
                  backgroundColor: "#E4E4E4",
                  borderRadius: 10000,
                  justifyContent: "center",
                  paddingLeft: "27%",
                }}
              >
                <Icon name="calendar" style={styles.icon}></Icon>
              </View>
              <Text
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 25,
                  marginLeft: "15%",
                  marginTop: "5%",
                  opacity: 0.63,
                  color: "#121212",
                }}
              >
                Calendar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Profile} style={styles.item}>
              <View
                style={{
                  flex: 2,
                  backgroundColor: "#E4E4E4",
                  borderRadius: 10000,
                  justifyContent: "center",
                  paddingLeft: "27%",
                }}
              >
                     <Icon name="user-o" style={styles.icon}></Icon>

              </View>
              <Text
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 25,
                  marginLeft: "33%",
                  marginTop: "5%",
                  opacity: 0.63,
                  color: "#121212",
                }}
              >
                Profil
              </Text>
            </TouchableOpacity>
          </View>
         
          
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 1,
    padding: 20,
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 7.9,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 20,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: "33%",
    paddingTop: 20,
  },
  profil: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 9000,
    width: 130,
    height: 130,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nom: {
    flex: 1,
    marginTop: 10,
  },
  Dashbord: {
    flex: 6,
    width: "100%",
    height: "100%",
    marginBottom:'30%'
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
  },
  icon: {
    color: "#2E1D73",
    fontSize: 70,
  },
  icon2: {
    color: "#2E1D73",
    fontSize: 60,
    marginLeft:"70%"
  },
});
