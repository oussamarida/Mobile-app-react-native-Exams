import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";


 const Search = () =>  {

    const [user, onChangeUser] = useState('');

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.containers}
  >
      <ImageBackground
        style={styles.background}
        source={require("../../assets/backdashbord.png")}
      >
        <View style={styles.searchBoX}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeUser}
            value={user}
            placeholder="CNE"
          />
           <TouchableOpacity style={styles.button} onPress={console.log("oussam")}>
              <View
                style={{
                  height: 70,
                  width: 200,
                  justifyContent: "center",
                  backgroundColor: "#8B15FF",
                }}
              >
                <Text style={styles.buttonText}>Search</Text>
              </View>
            </TouchableOpacity>
        </View>
        <View style={styles.etudiant}>
          <View style={{flexDirection: "row", justifyContent:'space-around', }}>
             <Text style={{fontSize:25}}>Nom:<Text style={{fontSize:20,fontWeight: "bold"}}> {user}</Text></Text>
             <Text style={{fontSize:25}}>Prenom:<Text style={{fontSize:20,fontWeight: "bold"}}> Oussama</Text></Text>
          </View>
          <View style={{flexDirection: "row", justifyContent:'space-around', }}>
             <Text style={{fontSize:25}}>filiere:<Text style={{fontSize:20,fontWeight: "bold"}}> IIR</Text></Text>
             <Text style={{fontSize:25}}>class:<Text style={{fontSize:20,fontWeight: "bold"}}> A12</Text></Text>
          </View>
          <View style={{flexDirection: "row", justifyContent:'space-around', }}>
             <Text style={{fontSize:25}}>Exam:<Text style={{fontSize:20,fontWeight: "bold"}}> </Text></Text>
             <Text style={{fontSize:25}}>Exam:<Text style={{fontSize:20,fontWeight: "bold"}}> </Text></Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
export default Search;




const styles2 = StyleSheet.create({
 
});









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
    borderRadius:40,
    paddingTop:50
  },
  searchBoX: {
    flex: 1,
    backgroundColor:'white',
    borderRadius:40,
    marginBottom:20,
    shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 30,
      shadowOpacity: 0.19,
      shadowRadius: 10,
      justifyContent:"space-around"

  },
  input: {
    height: 60,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 40,
    paddingLeft: 10,
    marginLeft:20,
    marginVertical: 10,
    shadowOffset: {
        width: 3,
        height: 3,
      },
      elevation: 30,
      shadowOpacity: 0.19,
      shadowRadius: 10,
      borderColor: "#8B15FF",
      borderStyle: "solid",
      borderBottomWidth: 1
  },
   button: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 70,
  }
});
