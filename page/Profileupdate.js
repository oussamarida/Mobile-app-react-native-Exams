import { useRoute } from "@react-navigation/native";
import { Image, Text, TextInput, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { StyleSheet, View } from "react-native";

import { useEffect, useState } from "react";
import apiUrl from './api/url'



export default function Profile({ navigation, route }) {
  const { user } = route.params;


    const [showInput, setShowInput] = useState(false);
    const [newPassword, setNewPassword] = useState('');
  
    const handleButtonPress = () => {
      setShowInput(true);
    }
    const handleInputChange = (text) => {
      setNewPassword(text);

    }
    const handleSubmit = () => {
      console.log(user.id)
      console.log(newPassword)
        const newuser = {
          id: user.id,
          email: user.email,
          password:newPassword,
          prenom: user.prenom,
          nom: user.nom,
          cne: user.cne,
          code: user.code,
        };
        fetch(`${apiUrl}surveillants`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newuser),
        })
      setShowInput(false);
      setNewPassword('');
    }

 

  return (
    <View style={styles.containers}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/backdashbord.png")}
      >
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 30 }}>Profil</Text>
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
            <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
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
          </View>
        </View>
        <View style={styles.Dashbord}>
          {showInput ? (
            <View style={{justifyContent:"center", marginTop:20}}>
              <TextInput
                style={styles.input}
                onChangeText={handleInputChange}
                value={newPassword}
                placeholder="      New password"
                secureTextEntry={true}
              />
                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <View
                style={{
                  height: 50,
                  width: 100,
                  justifyContent: "center",
                  backgroundColor: "#2E1D73",
                }}
              >
                <Text style={styles.buttonText}>UPDATE</Text>
              </View>
            </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <View
                style={{
                  height: 70,
                  width: 200,
                  justifyContent: "center",
                  backgroundColor: "#2E1D73",
                }}
              >
                <Text style={styles.buttonText}>UPDATE PASSWORD</Text>
              </View>
            </TouchableOpacity>
          )}
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
    flex: 7,
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
    flex: 12,
    width: "100%",
    height: "100%",
    borderRadius: 30,
    backgroundColor: "white",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },input:{
    height: 50, width:"60%" , marginLeft:'20%', borderRadius:20, 
    backgroundColor: "white",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 10,
  }
});
