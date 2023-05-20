import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import apiUrl from './api/url'



export default function HomeScreen({ navigation }) {
   const [user, onChangeUser] = useState('');
   const [password, onChangePassword] = useState('');
   const [allUser, setallUser] = useState([]);
   
   useEffect(() => {
    fetch(
      `${apiUrl}surveillants`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setallUser(responseData);
        
      })
      .catch((error) => console.error(error));
  }, []);


   const handleSubmit = () => {
    const foundUser = allUser.find(u => u.email === user && u.password === password);
   //const foundUser={"cne": "HH77077", "code": 1, "email": "aussamarida@gmail.com", "id": 151, "nom": "Oussama", "password": "12", "prenom": "Rida"}
    if (foundUser) {
      onChangeUser('')
      onChangePassword("")
      navigation.navigate('Dashbord',{user:foundUser});
    } else {
    alert("Username or password incorrect");
   }

  }



  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/BackLogin.png")}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUser}
            value={user}
            placeholder="User"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
         
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 10,
  },
  form: {
    flex: 1/3,
    justifyContent: "center",
    paddingTop:"15%",
    paddingBottom:"15%",
    backgroundColor:"white",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 30,
    shadowOpacity: 0.19,
    shadowRadius: 90,
    borderRadius:20,
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
    shadowRadius: 90,
    borderWidth: 0,
    borderColor: "#8B15FF",
    borderStyle: "solid",
    borderBottomWidth: 1
  },
  button: {
    height: 50,
    width: "50%",
    backgroundColor: "#8B15FF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:"52%",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
